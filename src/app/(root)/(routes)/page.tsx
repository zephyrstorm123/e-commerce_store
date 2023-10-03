"use client";
//the "use client" is a new feature of Next13 where we tell the client where to display the renders. It will by default display on the SERVER side only unless specified to eg "use client"


import Image from 'next/image'

import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

const SetupPage = () => {
  // Instead of useStoreModal = useStoreModal() so that we can use it in useEffect
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if(!isOpen){
      onOpen()
    }
  }, [isOpen, onOpen])

  return (
    <div className = "p-4">
      Root Page
    </div>
  );
}

export default SetupPage

