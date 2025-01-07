import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "@/components/module/users/user.interface";
import { ReactNode, useState } from "react";
import { useCreateUserMutation } from "@/redux/api/baseApi";

export function UserModal({
  user,
  trigger,
}: { user?: IUser } & { trigger?: ReactNode }) {
  const [open, setOpen] = useState(false);

  const [createUser] = useCreateUserMutation();

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    // create operation
    if (!user) {
      setOpen(false);
      form.reset();

      // create user
      createUser(data);
    }

    console.log(data);

    // update operation
    if (user) {
      setOpen(false);
      form.reset();

      // update user
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={!trigger ? true : false}>
        {trigger || <Button>Add User</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
          <DialogDescription>
            Fill up this form to {user ? "edit the" : "add a"} user.{" "}
            <span className="text-red-500">*</span> means required.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {/* Name input here  */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      aria-required
                      placeholder="Enter user name"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email input here  */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      aria-required
                      placeholder="Enter user email"
                      type="email"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* submit here  */}
            <DialogFooter>
              <Button type="submit">
                {user ? "Save changes" : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
