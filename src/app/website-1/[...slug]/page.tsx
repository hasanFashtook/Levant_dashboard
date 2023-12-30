'use client'
import { useEffect, useState } from 'react'
import { Pagination, Toggle } from 'rsuite'
import { Plus, Edit } from '@rsuite/icons';
import ChevronRight from '@rsuite/icons/legacy/ChevronRight'
import DataTable from 'react-data-table-component'
import { formikValuesTypes, itemData, productsStoreState } from '@/types/types'
import { Form, Formik } from 'formik'
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsPerCategories } from '@/lib/Actions/getAllProducts';
import { activeProduct, disActiveProduct } from '@/lib/Actions/activateProduct';
import { activateProductLocally, disActivateProductLocally } from '@/lib/Reducers/productsSlice'
import { AppDispatch } from '@/lib/Store';
import { addProduct } from '@/lib/Actions/addProduct';
import { editProduct } from '@/lib/Actions/editProduct';
import FormikControl from '@/components/FormikControl';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { Toaster, toast } from 'sonner';

const validationSchema = yup.object({
  service_id: yup.number().min(1).required('Required'),
  category_id: yup.number().required('Please choose on of categories'),
  count: yup.number().min(1).required('Required'),
  period_in_days: yup.number().min(1).required('Required'),
  price: yup.number().min(1).required('Required'),
  is_real_accounts: yup.string().oneOf(['1', '2'], 'lll').required('must be real or fake'),
});
const categoriesChoices = [
  {
    label: 'youtube',
    value: 1
  },
  {
    label: 'facebook',
    value: 2
  },
  {
    label: 'instagram',
    value: 3
  },
  {
    label: 'telegram',
    value: 4
  },
]

const radioOptions = [
  {
    label: 'Real',
    value: '1'
  },
  {
    label: 'Fake',
    value: '2'
  }
]

type popUpStateType = {
  active: boolean,
  type: string,
  id: number
}
interface pageProps {
  params: {
    slug: string[]
  }
}
const Page = ({ params }: pageProps) => {
  const { slug } = params;
  const [activePage, setActivePage] = useState(1);
  const [showPopUp, setShowPopUp] = useState<popUpStateType>({ active: false, type: 'add', id: 0 });
  const [initialValues, setInitialValues] = useState<formikValuesTypes>({
    code: '',
    service_id: 0,
    category_id: 0,
    count: 0,
    period_in_days: 0,
    price: 0,
    is_real_accounts: '1'
  })
  const dispatch = useDispatch<AppDispatch>();
  const axiosAuth = useAxiosAuth()
  const {
    activatingId,
    success,
    loading,
    error,
    productsData,
    lastDispatch
  } = useSelector((state: { products: productsStoreState }) => state.products);


  async function toggleActivate(id: number, type: number) {
    if (type == 1) {
      dispatch(disActivateProductLocally(id))
      dispatch(disActiveProduct(id));
    } else {
      dispatch(activateProductLocally(id))
      dispatch(activeProduct(id));
    }
  }

  useEffect(() => {
    const category: string | undefined = slug.at(-1)
    function getAllProducts() {
      dispatch(getProductsPerCategories({ activePage: activePage, category: category, axiosAuth }));
    }
    getAllProducts();
  }, [activePage, dispatch, slug, axiosAuth]);

  useEffect(() => {
    const message: string = lastDispatch == 'activeProduct'
      ? 'The Product Has Been Successfully Activated'
      : lastDispatch == 'disActiveProduct'
        ? 'The Product Has Been Successfully Deactivated'
        : lastDispatch == 'addProduct'
          ? 'The Product Has Been Successfully Added'
          : lastDispatch == 'editProduct'
            ? 'The Product Has Been Successfully Updated'
            : '';

    if (success && lastDispatch !== 'getProductsPerCategories') {
      setShowPopUp(prev => ({ ...prev, active: false }));
      toast.success(message, {
        position: 'bottom-left',
      });
    }
    if (error) {
      toast.error(error, {
        position: 'bottom-left'
      })
    }
  }, [success, lastDispatch, error])


  const columns = [
    {
      name: 'ID',
      selector: (row: itemData) => row.category.id,
    },
    {
      name: 'Service Type',
      selector: (row: itemData) => row.service.name,
    },
    {
      name: 'Count',
      selector: (row: itemData) => row.count,
    },
    {
      name: 'Duration',
      selector: (row: itemData) => row.period_in_days,
    },
    {
      name: 'Accunts',
      selector: (row: itemData) => row.status == 1 ? 'Real' : 'Fake',
    },
    {
      name: 'Price',
      selector: (row: itemData) => typeof (row.price) == 'string' ? `${parseInt(row.price)}$` : 'undefind',
    },
    {
      name: 'Action',
      cell: (row: itemData) => (
        <div className=' flex items-center gap-4'>
          <Toggle
            size="sm"
            checked={row.status == 1 ? true : false}
            disabled={loading && row.id == activatingId}
            onClick={() => toggleActivate(row.id, row.status)}
          />
          <Edit
            className=' text-primary w-4 h-4'
            onClick={() => {
              const { code, category: { id: category_id }, service: { id: service_id }, count, period_in_days, price, status } = row
              setInitialValues({
                code,
                service_id,
                category_id,
                count,
                period_in_days,
                price: price == null ? null : +price,
                is_real_accounts: `${status}`,
              })
              setShowPopUp(prev => ({ type: 'edit', active: !prev.active, id: row.id }))
            }
            }
          />
        </div>
      )
    },
  ];

  return <div className=' p-8 h-screen flex flex-col justify-between items-center' >
    {showPopUp.active &&
      <>
        <div
          className=' w-screen h-screen absolute top-0 left-0 z-30 bg-[#00000048]'
          onClick={() => setShowPopUp((prev) => ({ ...prev, active: !prev.active }))}>
        </div>
        <div className=' shadow-xl bg-[#fff] p-8 rounded-3xl absolute text-center top-1/2 left-1/2 z-40 -translate-y-1/2 -translate-x-1/2'>
          <h1 className=' mb-5 text-xl text-primary font-semibold capitalize'>{showPopUp.type} Service</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              const productDetails = {
                ...values,
                category_id: +values.category_id,
                code: `code:${Math.random() * 1000}`,
                is_real_accounts: values.is_real_accounts == '1' ? true : false
              }
              console.log(productDetails)
              if (showPopUp.type == 'add') {
                // add new product
                dispatch(addProduct({ axiosAuth, productDetails }));
              } else if (showPopUp.type == 'edit') {
                // edit existing products
                dispatch(editProduct({ axiosAuth, productDetails: productDetails, id: showPopUp.id }))
              }
              setShowPopUp(prev => ({ ...prev, active: !prev.active }))
            }}
          >
            {formik => (
              <Form
                onSubmit={formik.handleSubmit}
                className=' grid grid-cols-2 gap-x-8 gap-y-4 '>
                <div className='flex flex-col gap-2'>
                  <FormikControl
                    control='input'
                    name='service_id'
                    type='number'
                    label='Service Id'
                  />
                  <FormikControl
                    control='input'
                    name='count'
                    type='number'
                    label='Count'
                  />
                  <FormikControl
                    control='radio'
                    name='is_real_accounts'
                    label='Account'
                    options={radioOptions}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <FormikControl
                    control='select'
                    options={categoriesChoices}
                    name='category_id'
                    label='Category Id'
                  />
                  <FormikControl
                    control='input'
                    name='period_in_days'
                    type='number'
                    label='Duration'
                  />
                  <FormikControl
                    control='input'
                    name='price'
                    type='number'
                    label='Price'
                  />
                </div>
                <div className="flex col-span-2 justify-center gap-2">
                  <button
                    type="submit"
                    className='w-fit bg-[#e8eef9] text-secound text-sm px-10 py-2 rounded-full'
                    onClick={() => setShowPopUp(prev => ({ ...prev, active: !prev.active }))}
                  >back</button>
                  <button
                    disabled={loading}
                    type="submit"
                    className='w-fit relative bg-levant-gradient-r text-[#fff] text-sm px-10 py-2 rounded-full'
                  >
                    {showPopUp.type == 'edit' ? 'edit' : 'continue'}
                    {loading &&
                      <div className="lds-dual-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    }
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </>
    }
    <div className=" w-full">
      <div className=' flex items-center justify-between'>
        <div className=' flex gap-1 font-light text-lg'>{slug.map((item, i) => (
          <div key={i}>
            <span className={` capitalize ${i == slug.length - 1 ? 'text-primary' : 'text-secound'}`}>
              {item}
            </span>
            {i != slug.length - 1 &&
              <ChevronRight className=' ml-1 text-secound text-sm' />
            }
          </div>
        ))}</div>
        <Toaster duration={5000} richColors />
        <button
          type='button'
          className=' text-[#40E1FE] flex items-center'
          onClick={() => {
            setInitialValues({
              code: '',
              service_id: 0,
              category_id: 0,
              count: 0,
              period_in_days: 0,
              price: 0,
              is_real_accounts: '1'
            })
            setShowPopUp(prev => ({ active: true, type: 'add', id: 0 }))
          }}
        >
          <Plus className=' w-3 h-3' />
          <div>
            Add Service
          </div>
        </button>
      </div>
      <div className=' overflow-x-scroll mt-8'>
        <DataTable
          columns={columns}
          data={productsData.products}
          customStyles={{
            table: {
              style: {
                maxHeight: '300px',
              }
            },
            headRow: {
              style: {
                backgroundColor: '#F5F8FF',
              }
            },
            rows: {
              style: {
                backgroundColor: '#F5F8FF',
                borderBottomColor: '#edf0f5',
              }
            },
            headCells: {
              style: {
                backgroundColor: 'transparent',
                textTransform: 'capitalize',
                fontSize: '1.125rem',
                color: '#322650',
                fontWeight: "500",
                justifyContent: 'center'
              }
            },
            cells: {
              style: {
                backgroundColor: 'transparent',
                color: '#b5b4c6',
                textTransform: 'capitalize',
                fontSize: '1.125rem',
                justifyContent: 'center'
              },
            },
          }}
        />
      </div>
    </div>
    <Pagination
      prev
      next
      size="md"
      total={productsData.count}
      limit={3}
      activePage={activePage}
      onChangePage={setActivePage}
    />
  </div >
}

export default Page;