import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { DraftTask, ITask } from "@/components/module/task/task.interface";
import { addTask, editTask } from "@/redux/features/tasks/taskSlice";
import { useAppDispatch } from "@/redux/hook";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export function AddTaskModal({
  task,
  trigger,
}: { task?: ITask } & { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? new Date(task?.dueDate) : new Date(),
      priority: task?.priority || "medium",
    },
  });

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    // create operation
    if (!task) {
      if (typeof data.dueDate !== "string") {
        data.dueDate = data.dueDate.toString();
      }

      dispatch(addTask(data as DraftTask));
    }

    // update operation
    if (task) {
      if (typeof data.dueDate !== "string") {
        data.dueDate = data.dueDate.toString();
      }

      dispatch(editTask({ ...data, id: task.id } as ITask));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild={!trigger ? true : false}>
        {trigger || <Button>Add Task</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Fill up this form to add a new task.{" "}
            <span className="text-red-500">*</span> means required.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {/* title input here  */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      aria-required
                      placeholder="Enter task title"
                      {...field}
                      defaultValue={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* description input here  */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      required
                      aria-required
                      placeholder="Enter task description"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* due date input here  */}
            <FormField
              rules={{
                required: "Please select a due date",
              }}
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel>
                    Due Date <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !(task?.dueDate || field.value) &&
                              "text-muted-foreground"
                          )}
                          onClick={() => setOpen(true)}
                        >
                          {task?.dueDate || field.value ? (
                            format(field.value.toDateString(), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        required
                        mode="single"
                        selected={
                          task?.dueDate
                            ? new Date(task?.dueDate as string)
                            : field.value
                            ? new Date(field.value)
                            : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date?.toDateString());
                          setOpen(false);
                        }}
                        disabled={(date) => date < new Date("2000-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* priority input here  */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Priority <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    required
                    aria-required
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* submit here  */}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
