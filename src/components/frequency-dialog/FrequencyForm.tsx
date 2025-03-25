
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMapContext } from '../MapContext';

export interface FrequencyFormProps {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}

export const FrequencyForm: React.FC<FrequencyFormProps> = ({ form }) => {
  const { selectedLocation } = useMapContext();

  useEffect(() => {
    if (selectedLocation) {
      form.setValue('locationName', selectedLocation.locationName);
    }
  }, [selectedLocation, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => {})} className="space-y-4">
        <BasicFieldsSection form={form} />
        <LocationFieldsSection form={form} />
        <TechnicalFieldsSection form={form} />
        <APRSFieldsSection form={form} />
      </form>
    </Form>
  );
};

const BasicFieldsSection = ({ form }: FrequencyFormProps) => (
  <>
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
  </>
);

const LocationFieldsSection = ({ form }: FrequencyFormProps) => (
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
);

const TechnicalFieldsSection = ({ form }: FrequencyFormProps) => (
  <>
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
  </>
);

const APRSFieldsSection = ({ form }: FrequencyFormProps) => (
  <>
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
  </>
);
