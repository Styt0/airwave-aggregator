
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useMapContext } from '../MapContext';
import { FrequencyForm } from './FrequencyForm';
import { formSchema } from './formSchema';
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AddFrequencyDialogProps {
  onAddFrequency: (values: any, coordinates: { latitude: number; longitude: number } | null) => void;
  userCoordinates: { latitude: number; longitude: number } | null;
}

export const AddFrequencyDialog: React.FC<AddFrequencyDialogProps> = ({ 
  onAddFrequency, 
  userCoordinates 
}) => {
  const { toast } = useToast();
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
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddFrequency(values, selectedLocation || userCoordinates);
    toast({
      title: "Frequency Added!",
      description: "Your frequency has been added to the database.",
    });
    setOpen(false);
    form.reset();
  }

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
        
        <FrequencyForm form={form} />
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>Add Frequency</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
