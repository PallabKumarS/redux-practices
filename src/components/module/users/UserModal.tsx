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
import { useAppDispatch } from "@/redux/hook";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DraftUser, IUser } from "@/components/module/users/user.interface";
import { addUser, editUser } from "@/redux/features/users/userSlice";
import { ReactNode, useState } from "react";

export function UserModal({
  user,
  trigger,
}: { user?: IUser } & { trigger?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    // create operation
    if (!user) {
      dispatch(addUser(data as DraftUser));
      setOpen(false);
    }

    // update operation
    if (user) {
      dispatch(editUser({ ...data, id: user.id } as IUser));
      setOpen(false);
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
