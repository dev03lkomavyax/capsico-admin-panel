import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import usePostApiReq from "@/hooks/usePostApiReq";
import { categorySchema } from "@/schema/restaurantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const CategoryEditModel = ({ isOpenCategoryModel, setIsOpenCategoryModel, getCategories }) => {

    const { res, isLoading, fetchData } = usePostApiReq()

    const form = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            category: "",
            description: "",
        }
    })
    const params = useParams();

    const { register, control, watch, setValue, getValues, reset } = form;

    const onSubmit = (data) => {
        console.log("data", data)
        fetchData(`/admin/post-add-category/${params?.restaurantId}`, {
            name: data.category,
            description: data.description
        })
        console.log('submit form')
    }


    useEffect(() => {
        if (res?.status === 200 || res?.status === 201) {
            console.log("Add category res", res);
            toast.success(res?.data?.message)
            getCategories()
            reset()
            setIsOpenCategoryModel(false)
        }
    }, [res])


    return (
        <Dialog open={isOpenCategoryModel} onOpenChange={setIsOpenCategoryModel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full py-3">
                            <div className="w-full mt-5">
                                <FormField
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="z-20">
                                            <FormLabel className="text-[#969696]">Category Name</FormLabel>
                                            <FormControl>
                                                <Input type='text'  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full mt-5">
                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="z-20">
                                            <FormLabel className="text-[#969696]">Description</FormLabel>
                                            <FormControl>
                                                <Textarea className='resize-none' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" size="lg" variant="capsico" className="w-full mt-10">Add Category</Button>
                        </form>
                    </Form>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryEditModel
