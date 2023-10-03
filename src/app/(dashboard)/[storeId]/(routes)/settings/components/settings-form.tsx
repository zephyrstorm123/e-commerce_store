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
    FormField, 
    FormItem, 
    FormLabel 
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertModal } from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'


interface SettingsFormProps {
    initialData: Store
}

//Creating a form
const formSchema = z.object({
    name: z.string().nonempty({message: 'Store name is required'}),
})

type SettingFormsValues = z.infer<typeof formSchema>

export const SettingsForm: React.FC<SettingsFormProps> = (
    {initialData}
) => {

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const form = useForm<SettingFormsValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    })

    const onSubmit = async (data: SettingFormsValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success('Store updated successfully')
            router.push(`/`)

        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success('Store deleted successfully')
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
                    title = 'Settings'
                    description = 'Manage your store settings'
                    />
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
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField 
                            control={form.control}
                            name = 'name'
                            render={
                                ({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Input
                                                disabled={loading}
                                                placeholder='Store Name'             
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
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert 
                title='NEXT_PUBLIC_API_URL'
                description={`${origin}/api/stores/${params.storeId}`}
                variant='public'
            />
        </>
    )
}