"use client";

import * as z from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import prismadb from "@/lib/prismadb";


const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal()
    const [loading, setLoading] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:" "
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)
            
            const response = await axios.post('/api/stores', values)

            //window.location.assign will completely reload the data
            window.location.assign(`/${response.data.id}`)
        } catch(error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    const onCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
        
        try {
            e.preventDefault()
            setLoading(true)
            const response = await axios.get(`/api/stores`)
            
            if(!response.data) {
                console.log("No items found")
            } else {
                console.log(response.data)
            }


        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
      };

    return (
        <Modal
            title = 'Add New Store'
            description = 'Add a new store to manage products and categories'
            isOpen = {storeModal.isOpen}
            onClose = {storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-4 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control}
                                name="name"
                                render = {({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="E-Commerce" 
                                                disabled = {loading}
                                                // Spreads the content of the field prop, this means that the input will then get the properties of the field such as onChange, etc
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage>

                                        </FormMessage>
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                    <Button 
                                        variant="outline"
                                        onClick={onCancel}
                                        disabled={loading}
                                    >
                                            Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                    >
                                        Continue
                                    </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
    </Modal>
    )
}