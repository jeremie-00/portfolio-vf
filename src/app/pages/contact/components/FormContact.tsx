"use client";
import { IconLoaderCircle } from "@/app/dashboard/icons/components/DynamicIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FullSectionPage } from "@/types/prismaTypes";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import Form from "next/form";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmail } from "../services/contact.action";
import { ToastContactAction } from "./ToastContact";

export default function FormContact({
  section,
}: {
  section: FullSectionPage | null;
}) {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const BtnSubmit = () => {
    const { pending } = useFormStatus();

    const isDisabled =
      pending ||
      !formData.lastName ||
      !formData.firstName ||
      !formData.email ||
      !formData.message;

    return (
      <Button type="submit" disabled={isDisabled} size="default">
        {pending ? <IconLoaderCircle /> : "Envoyer"}
      </Button>
    );
  };

  const handleSubmit = async (formData: FormData) => {
    const response = await sendEmail(formData);

    if (response?.serverError || response?.validationErrors) {
      ToastContactAction({
        serverError: response.serverError,
        validationErrors: response.validationErrors,
      });
      return;
    }

    if (response?.data) {
      ToastContactAction({ data: response.data });
      setFormData({
        lastName: "",
        firstName: "",
        email: "",
        message: "",
      });
      redirect("/");
    }
  };

  return (
    <div className="relative flex items-center justify-center rounded-xl overflow-hidden p-px">
      <motion.div
        className="absolute flex w-[20rem] h-[150%] bg-gradient-to-l from-background via-primary to-background -z-10"
        animate={{ rotate: [0, 360] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
        style={{
          top: "50%",
          transform: "translate(-50%, -50%)",
          transformOrigin: "top",
        }}
      ></motion.div>
      <Card className="bg-card shadow-none">
        <CardHeader className="flex flex-col p-8 ">
          <CardTitle className="px-4 py-8 place-items-center border border-border rounded-lg shadow-md dark:shadow-primary/40">
            {section?.titles.map((title) => (
              <h1
                key={title.text}
                className=" text-2xl text-primary text-center"
              >
                {title.text}
              </h1>
            ))}
            {section?.contents.map((content) => (
              <span
                key={content.text}
                className="block p-4 text-sm text-center max-w-md"
              >
                {content.text}
              </span>
            ))}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={handleSubmit} className="flex flex-col w-full gap-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName" className="pl-2">
                  Nom
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="firsName" className="pl-2">
                  Prenom
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firsName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="pl-2">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email@exemple.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="pl-2">
                Message
              </Label>
              <Textarea
                name="message"
                id="message"
                placeholder="Votre message..."
                className="w-full h-40"
                value={formData.message}
                onChange={handleChange}
              />
              <span className="text-sm text-muted-foreground text-right mt-2">
                {formData.message.length}/500
              </span>
            </div>

            <div className="flex justify-end gap-4">
              <BtnSubmit />
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
