# Task API Docs:

## Base URL:
`https://backend.watanyia.com`

## End Points:

1. admin login:
   ```
   POST: /api/v1/auth/admin/login
   payload: 
   username: super_admin
   password: 12345678
   ```
2. get all categories
   ```
   GET: /api/v1/admin/categories/index
   ```
3. get all services
   ```
   GET: /api/v1/admin/services/index
   ```
4. get all products:
   ```
   GET: /api/v1/admin/products/index?filter[]
   ```
5. add product:
   ```
   POST: /api/v1/admin/products/store
   payload: 
   code: string
   category_id: number
   service_id: number
   count: number
   period_in_days: number
   is_real_accounts: boolean
   price: number
   ```
6. edit product:
   ```
   POST: /api/v1/admin/products/update/[id]
   payload:
   code: string
   category_id: number
   service_id: number
   count: number
   period_in_days: number
   is_real_accounts: boolean
   price: number
   ```
7. activate product:
   ```
   POST: /api/v1/admin/products/activate/[id]
   ```
8. deactivate product
   ```
   POST: /api/v1/admin/products/inactivate/[id]
   ```

## Authorization 
`Bearer Token`