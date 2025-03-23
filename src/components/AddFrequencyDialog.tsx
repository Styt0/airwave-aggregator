
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FrequencyCategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';

const frequencyCategories: Exclude<FrequencyCategory, 'All'>[] = [
  'Airband', 'VHF', 'UHF', 'Repeaters', 'CW', 'HF', 'Satellite', 
  'Space', 'Military', 'Weather', 'Maritime', 'Digital', 'Amateur',
  'VOLMET', 'Utility', 'Airport'
];

const formSchema = z.object({
  frequency: z.string().min(1, "Frequency is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.enum([
    'Airband', 'VHF', 'UHF', 'Repeaters', 'CW', 'HF', 'Satellite', 
    'Space', 'Military', 'Weather', 'Maritime', 'Digital', 'Amateur',
    'VOLMET', 'Utility', 'Airport'
  ]),
  locationName: z.string().min(1, "Location name is required"),
  // Airport specific fields
  icaoCode: z.string().optional(),
  iataCode: z.string().optional(),
  elevationFt: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  type: z.string().optional(),
});

interface AddFrequencyDialogProps {
  onAddFrequency: (
    values: z.infer<typeof formSchema>,
    userCoordinates: { latitude: number; longitude: number } | null
  ) => void;
  userCoordinates: { latitude: number; longitude: number } | null;
}

export const AddFrequencyDialog: React.FC<AddFrequencyDialogProps> = ({ 
  onAddFrequency,
  userCoordinates
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Exclude<FrequencyCategory, 'All'>>('VHF');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      frequency: '',
      name: '',
      description: '',
      category: 'VHF',
      locationName: userCoordinates ? 'Your Location' : '',
      icaoCode: '',
      iataCode: '',
      type: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddFrequency(values, userCoordinates);
    form.reset();
    setOpen(false);
  };

  // Handle category change to show/hide specific fields
  const handleCategoryChange = (category: Exclude<FrequencyCategory, 'All'>) => {
    setSelectedCategory(category);
    form.setValue('category', category);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Frequency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Frequency</DialogTitle>
          <DialogDescription>
            Enter details about the frequency you want to add.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency (MHz)</FormLabel>
                    <FormControl>
                      <Input placeholder="145.500" {...field} />
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
                    <Select 
                      onValueChange={(value) => handleCategoryChange(value as Exclude<FrequencyCategory, 'All'>)} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {frequencyCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="VHF Calling Frequency" {...field} />
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
                      placeholder="Common simplex calling frequency" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Optional details about this frequency
                  </FormDescription>
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
                    <Input placeholder="Brussels" {...field} />
                  </FormControl>
                  <FormDescription>
                    {userCoordinates 
                      ? "Will use your current coordinates for location data" 
                      : "Enable location services to include your coordinates"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Airport-specific fields, only show when 'Airport' category is selected */}
            {selectedCategory === 'Airport' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="icaoCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ICAO Code</FormLabel>
                        <FormControl>
                          <Input placeholder="EBBR" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="iataCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>IATA Code</FormLabel>
                        <FormControl>
                          <Input placeholder="BRU" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="elevationFt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Elevation (ft)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="184" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Airport Type</FormLabel>
                        <FormControl>
                          <Input placeholder="International" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button type="submit">Add Frequency</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
