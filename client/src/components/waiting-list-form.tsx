import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitingListSchema } from "@shared/schema";
import { useCreateWaitingListEntry } from "@/hooks/use-waiting-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import type { z } from "zod";

type FormData = z.infer<typeof insertWaitingListSchema>;

export function WaitingListForm() {
  const { mutate, isPending, isSuccess } = useCreateWaitingListEntry();
  
  const form = useForm<FormData>({
    resolver: zodResolver(insertWaitingListSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(data: FormData) {
    mutate(data);
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-primary/10 border border-primary text-center"
      >
        <h3 className="text-2xl font-bold text-primary mb-2">You're In!</h3>
        <p className="text-muted-foreground">
          Thanks for joining the revolution. We'll be in touch soon with exclusive updates.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary/90">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Elon Musk" 
                    {...field} 
                    className="bg-background/50 border-white/10 focus:border-primary focus:ring-primary/20 h-12 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary/90">Email Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="elon@mars.com" 
                    type="email"
                    {...field} 
                    className="bg-background/50 border-white/10 focus:border-primary focus:ring-primary/20 h-12 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary/90">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+91 98765 43210" 
                    {...field} 
                    className="bg-background/50 border-white/10 focus:border-primary focus:ring-primary/20 h-12 rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-14 text-lg font-bold bg-primary text-background hover:bg-primary/90 rounded-lg group transition-all duration-300"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> 
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Join Waiting List 
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
