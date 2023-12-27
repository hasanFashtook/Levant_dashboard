import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { options } from '../../pages/api/auth/[...nextauth]';
export default async function Home() {
  const session = await getServerSession(options);
  if (!session || !session.user) {
    redirect('/login')
  }
  return (
    <div className='w-full h-screen grid place-items-center'>
      <Image
        src={'/Group_210.svg'}
        width={500}
        height={200}
        alt='loading...'
      />
    </div>
  )
}