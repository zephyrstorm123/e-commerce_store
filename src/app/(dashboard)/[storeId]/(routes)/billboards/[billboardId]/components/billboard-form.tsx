"use client"

//Global imports
import * as React from 'react'
import * as z from 'zod'
import {Store} from '@prisma/client'
import { set, useForm } from 'react-hook-form'
import { Trash } from 'lucide-react'
import {zodResolver} from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

//Local imports
import { Separator } from '@/components/ui/separator'
import {Heading} from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertModal } from '@/components/modals/alert-modal'
import { useOrigin } from '@/hooks/use-origin'
import { Billboard } from '@prisma/client'
import ImageUpload from '@/components/ui/image-upload'


interface BillboardFormProps {
    initialData: Billboard | null
}

//Billboard form
const formSchema = z.object({
    label: z.string().nonempty({message: 'Store name is required'}),
    imageUrl: z.string().nonempty({message: 'Store image is required'}),
})

type BillboardFormsValues = z.infer<typeof formSchema>

export const BillboardForm: React.FC<BillboardFormProps> = (
    {initialData}
) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    //Dynamic print out in client side
    const title = initialData ? 'Edit Billboard' : 'Create Billboard'
    const description = initialData ? 'Edit your billboard' : 'Add your billboard'
    const toastMessage = initialData ? 'Billboard updated successfully' : 'Billboard created successfully'
    const action = initialData ? 'Save Changes' : 'Create Billboard'

    const form = useForm<BillboardFormsValues>({
        //zodResolver requires a zod schema to be defined in the server side
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: '',
        },
    })

    const onSubmit = async (data: BillboardFormsValues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }

            router.refresh()
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage)

        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push('/')
            toast.success('Billboard deleted successfully')
        } catch (error) {
            toast.error('Make sure you remove all products first')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return(
        <>
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='flex items-center justify-between'>
                <Heading 
                    title = {title}
                    description = {description}
                    />
                
                {/* Conditional Statement where if initial data exist, show that the only time you show button */}
                {
                    initialData && (

                        <Button
                            disabled={loading}
                            variant='destructive'
                            size='sm'
                            onClick={() => setOpen(true)}
                            >
                        <Trash 
                            className='h-4 w-4' 
                            />
                        </Button>
                )}
            </div>
            <Separator />
            {/* Form from shadcn */}
            <Form
                {...form}
            >
                {/* html native form */}
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8 w-full'    
                >   
                    {/* Creates a form field that is connected to cloudinary image upload */}
                    <FormField 
                            control={form.control}
                            name="imageUrl"
                            render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Background Image
                                            <FormControl>
                                                <ImageUpload 
                                                    value={field.value ? [field.value] : []}
                                                    disabled={loading}
                                                    onChange={(url) => field.onChange(url)}
                                                    onRemove={() => field.onChange("")}
                                                />
                                            </FormControl>
                                        </FormLabel>
                                    </FormItem>
                                )
                            }
                        />
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField 
                            control={form.control}
                            name = 'label'
                            render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Input
                                                disabled={loading}
                                                placeholder='Billboard Label'             
                                                {...field}
                                                />
                                        </FormLabel>
                                    </FormItem>
                                )
                            }
                        />
                    </div>
                    <Button
                        variant={loading ? 'secondary': 'default'}
                        disabled={loading}
                        className='ml-auto'
                        type='submit'
                    >
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}