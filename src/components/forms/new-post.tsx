"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDownIcon,
  GlobeIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { regions } from "@/config/regions";
import { SliderRange } from "../ui/slidler-range";
import MultipleSelector from "../ui/multiple-selector";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { PostSchema } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";

interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}
const OPTIONS: Option[] = [
  { label: "nextjs", value: "Nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular" },
  { label: "Ember", value: "ember" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
];
// const FormSchema = PostSchema;
const FormSchema = z.object({
  publicContact: z.boolean(),
  city: z.string().nonempty(),
  tags: z.array(z.any()),
});

export default function NewPostForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      publicContact: true,
      city: "",
      tags: [],
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
      {
        duration: 5000,
      },
    );
  }
  //states managment
  const [publicProfile, setPublicProfile] = React.useState(true);
  const [region, setRegion] = React.useState("");

  return (
    <Form {...form}>
      <form className="flex h-max w-full flex-col items-center gap-4 overflow-y-scroll p-2">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">
            Nivel de Verificacion: {""}
            <span className="text-lg text-primary">3</span>
          </p>
          <Button variant={"link"} size={"sm"}>
            Aumentar Nivel de Verificacion
          </Button>
        </div>
        <Card className="w-full max-w-5xl">
          <CardHeader>
            <CardTitle className="text-lg">Mostrar Contacto Publico</CardTitle>
            <CardDescription>Como queres que te contacten?</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="publicContact"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid items-center gap-6 px-10 md:grid-cols-2 md:gap-2">
                      <Button
                        size={"sm"}
                        className={
                          "py-8 shadow-inner shadow-primary/30" +
                          (publicProfile ? "" : " bg-accent")
                        }
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          setPublicProfile(false);
                          field.onChange(false);
                        }}
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="flex items-center justify-center gap-1">
                            <LockClosedIcon className="h-4 w-4" />
                            <span>Privado</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Te llegara un mensaje y tu decides si contactarlos.
                          </p>
                        </div>
                      </Button>
                      <Button
                        size={"sm"}
                        className={
                          "py-8 shadow-inner shadow-primary/30" +
                          (publicProfile ? " bg-accent" : "")
                        }
                        variant="outline"
                        onClick={(e) => {
                          e.preventDefault();
                          setPublicProfile(true);
                          field.onChange(true);
                        }}
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="flex items-center justify-center gap-1">
                            <GlobeIcon className="h-4 w-4" />
                            <span>Publico</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Cualquiera podra contactarte directamente.
                          </p>
                        </div>
                      </Button>
                      <div className="pt-2 text-center text-sm text-muted-foreground md:col-span-2">
                        Ningun dato sensible sera mostrado nunca.
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card className="w-full max-w-5xl">
          <CardHeader>
            <CardTitle className="text-lg">Ubicacion</CardTitle>
            <CardDescription>Selecciona donde estas buscando.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setRegion(value);
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Selecciona una region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region.region} value={region.region}>
                          {region.region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    You can manage email addresses in your{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
            <FormItem>
              <FormLabel>Frameworks</FormLabel>
              <FormControl>
                <MultipleSelector
                  value={field.value }
                  onChange={field.onChange}
                  defaultOptions={OPTIONS}
                  placeholder="Select frameworks you like..."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
            />
            <div className="grid gap-1.5">
              <Label htmlFor="city">Zona (Mapa)</Label>
              <Input disabled id="city" placeholder="Proximamente" />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full max-w-5xl px-2">
          <CardHeader>
            <CardTitle className="text-lg">Caracteristicas</CardTitle>
            <CardDescription>
              Seleccione las caracteristicas de la propiedad.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex w-full flex-col justify-center gap-4">
            <div className="flex items-center justify-start space-x-2">
              <legend className="mb-2 w-1/3 text-sm font-medium">
                Tipo de propiedad
              </legend>
              <div className="flex space-x-2 ">
                <div className="flex items-center space-x-2">
                  <Checkbox id="casa" />
                  <label
                    htmlFor="casa"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Casa
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="departamento" />
                  <label
                    htmlFor="departamento"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Departamento
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Label htmlFor="rooms" className="w-1/3">
                Habitaciones
              </Label>
              <SliderRange
                min={0}
                max={10}
                minStepsBetweenThumbs={1}
                step={1}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label className="w-1/3" htmlFor="bathrooms">
                Baños
              </Label>
              <SliderRange min={0} max={6} minStepsBetweenThumbs={1} step={1} />
            </div>
            <Collapsible>
              <CollapsibleTrigger>
                <legend className="mb-2 flex text-sm font-semibold ">
                  Caracteristicas adicionales{" "}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </legend>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex w-full flex-col justify-center gap-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <Label className="w-1/3" htmlFor="m2">
                      Metros Cuadrados
                    </Label>
                    <SliderRange
                      min={10}
                      max={400}
                      minStepsBetweenThumbs={10}
                      step={10}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="year">Año de construccion</Label>
                    <Input
                      id="year"
                      placeholder="Ingrese el año de construccion"
                      type="number"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label className="w-1/3" htmlFor="parking">
                      Estacionamiento
                    </Label>
                    <Checkbox id="parking" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label className="w-1/3" htmlFor="storage">
                      Bodega
                    </Label>
                    <Checkbox id="storage" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label className="w-1/3" htmlFor="furnished">
                      Amoblado
                    </Label>
                    <Checkbox id="furnished" />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
        <Card className="w-full max-w-5xl px-2">
          <CardHeader>
            <CardTitle className="text-lg">Precio y Costos</CardTitle>
            <CardDescription>
              Ingresa el rango de precios y costos adicionales que bucas.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Label className="w-1/3" htmlFor="price">
                Precio
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="price-min"
                  placeholder="Precio minimo"
                  type="number"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  id="price-max"
                  placeholder="Precio maximo"
                  type="number"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label className="w-1/3" htmlFor="additional-costs">
                Gastos Comunes
              </Label>
              <div className="flex items-center space-x-2">
                <Input id="price-min" placeholder="15k" type="number" />
                <span className="text-muted-foreground">-</span>
                <Input id="price-max" placeholder="250k" type="number" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="other-details">Detalles Adicionales</Label>
              <Textarea
                className="min-h-[100px]"
                id="other-details"
                placeholder="Ingresa otros detalles que quieras mencionar"
              />
            </div>
          </CardContent>
        </Card>
        <Button
          className="w-max-5xl w-96 py-4 drop-shadow-[0_20px_50px_rgba(61,_97,_255,_0.2)]"
          variant="default"
          type="submit"
          onClick={form.handleSubmit(onSubmit)}
        >
          Publicar
        </Button>
      </form>
    </Form>
  );
}
