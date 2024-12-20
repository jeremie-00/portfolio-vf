"use client";
import { IconLoaderCircle } from "@/app/dashboard/icons/components/DynamicIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@radix-ui/react-label";
import Form from "next/form";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function FormContact() {
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
    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.email ||
      !formData.message
    ) {
      return (
        <Button type="submit" disabled={true} size="default">
          Envoyer
        </Button>
      );
    }
    return (
      <Button type="submit" disabled={pending} size="default">
        {pending ? <IconLoaderCircle /> : "Envoyer"}
      </Button>
    );
  };

  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "📬 Bientôt dans votre boîte mail !",
      description:
        "Merci pour votre message ! L'envoi d'e-mails n'est pas encore disponible... mais ça arrive bientôt. 🚀",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col">
        <CardTitle className="px-4 py-8 text-center">
          <h1 className=" text-2xl text-primary">Contactez-moi</h1>
          <span className="block p-4 text-sm max-w-md">
            Les informations que vous soumettez via ce formulaire sont
            uniquement utilisées pour vous répondre. Elles ne sont pas
            enregistrées dans une base de données et ne seront pas transmises à
            des tiers.
          </span>
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
          </div>

          <div className="flex justify-end gap-4">
            <BtnSubmit />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
