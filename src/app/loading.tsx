import Image from 'next/image'
import React from 'react'

function loading() {
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

export default loading;