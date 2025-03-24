import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useMapContext } from './MapContext';

const formSchema = z.object({
  frequency: z.string().min(1, {
    message: "Frequency must be at least 1 character.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  locationName: z.string().min(2, {
    message: "Location name must be at least 2 characters.",
  }),
  offset: z.string().optional(),
  tone: z.string().optional(),
  mode: z.string().optional(),
  source: z.string().optional(),
  callsign: z.string().optional(),
  symbol: z.string().optional(),
  course: z.string().optional(),
  speed: z.string().optional(),
  altitude: z.string().optional(),
  comment: z.string().optional(),
  path: z.string().optional(),
})

interface AddFrequencyDialogProps {
  onAddFrequency: (values: any, coordinates: { latitude: number; longitude: number } | null) => void;
  userCoordinates: { latitude: number; longitude: number } | null;
}

export const AddFrequencyDialog: React.FC<AddFrequencyDialogProps> = ({ onAddFrequency, userCoordinates }) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false);
  const { selectedLocation } = useMapContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frequency: "",
      name: "",
      description: "",
      category: "Amateur",
      locationName: "",
      offset: "",
      tone: "",
      mode: "",
      source: "",
      callsign: "",
      symbol: "",
      course: "",
      speed: "",
      altitude: "",
      comment: "",
      path: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddFrequency(values, selectedLocation || userCoordinates);
    toast({
      title: "Frequency Added!",
      description: "Your frequency has been added to the database.",
    })
    setOpen(false);
    form.reset();
  }

  useEffect(() => {
    if (selectedLocation) {
      form.setValue('locationName', selectedLocation.locationName);
    }
  }, [selectedLocation, form]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add Frequency</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a New Frequency</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new frequency to the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter frequency" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Amateur">Amateur</SelectItem>
                      <SelectItem value="Airband">Airband</SelectItem>
                      <SelectItem value="Maritime">Maritime</SelectItem>
                      <SelectItem value="Weather">Weather</SelectItem>
                      <SelectItem value="Digital">Digital</SelectItem>
                      <SelectItem value="Space">Space</SelectItem>
                      <SelectItem value="Satellite">Satellite</SelectItem>
                      <SelectItem value="Utility">Utility</SelectItem>
                      <SelectItem value="Airport">Airport</SelectItem>
                      <SelectItem value="APRS">APRS</SelectItem>
                      <SelectItem value="LoRa">LoRa</SelectItem>
                      <SelectItem value="Meshtastic">Meshtastic</SelectItem>
                       <SelectItem value="ModeS">ModeS</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offset</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter offset" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter tone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter source" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="callsign"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Callsign</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter callsign" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symbol</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter symbol" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speed</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter speed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altitude</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter altitude" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Path</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter path" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Add Frequency</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
