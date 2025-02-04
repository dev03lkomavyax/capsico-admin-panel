import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateCustomModelSecondSchema } from '@/schema/CreateCustomModel'

const CreateCustomModelSecond = ({onSubmit}) => {
  const form = useForm({
    resolver: zodResolver(CreateCustomModelSecondSchema),
    defaultValues: {
      applicableTo: "All Items",
      usageLimits: 100,
      minOrderValue: 0,
      maxUsage: 0,
      maxUsesPerUser: 3,
      usageFrequency: "No Restriction",
    }
  })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="applicableTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicable to</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select items" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="All Items">All Items</SelectItem>
                  <SelectItem value="Selected Items">Selected Items</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usageLimits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usage Limits</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minOrderValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Order Value</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxUsage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Usage</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxUsesPerUser"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Uses Per User</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number.parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usageFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usage Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="No Restriction">No Restriction</SelectItem>
                  <SelectItem value="Once Per Day">Once Per Day</SelectItem>
                  <SelectItem value="Once Per Week">Once Per Week</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  )
}

export default CreateCustomModelSecond