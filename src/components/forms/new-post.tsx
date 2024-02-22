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
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
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
import { FancyMultiSelect } from "../ui/tag-input/multi-selec";
import { PostSchema } from "@/lib/validators/post";
import { currencyFormat } from "@/lib/utils";

const FormSchema = PostSchema;

export default function NewPostForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      publicContact: true,
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>,
      {
        duration: 5000,
        closeButton: true,
      },
    );
  }
  //states managment
  const [publicProfile, setPublicProfile] = React.useState(true);
  const [regionValue, setRegion] = React.useState("");

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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="communes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comunas</FormLabel>
                  <FormControl>
                    <FancyMultiSelect
                      onChange={(value) => field.onChange(value)}
                      max={4}
                      data={
                        regions.find((r) => r.region === regionValue)
                          ?.comunas ?? []
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Puedes seleccionar hasta 5 comunas.
                  </FormDescription>
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
                  <FormField
                    control={form.control}
                    name="houseType"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormLabel>Casa</FormLabel>
                        <FormControl>
                          <Checkbox
                            id="casa"
                            onCheckedChange={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FormField
                    control={form.control}
                    name="apartamenetType"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormLabel>Departamento</FormLabel>
                        <FormControl>
                          <Checkbox
                            id="dept"
                            onCheckedChange={(value) => field.onChange(value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Label htmlFor="rooms" className="w-1/3">
                Habitaciones
              </Label>
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SliderRange
                        min={0}
                        max={10}
                        minStepsBetweenThumbs={1}
                        step={1}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label className="w-1/3" htmlFor="bathrooms">
                Baños
              </Label>
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <SliderRange
                        min={0}
                        max={5}
                        minStepsBetweenThumbs={1}
                        step={1}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Collapsible>
              <CollapsibleTrigger>
                <legend className="mb-2 flex text-sm font-semibold ">
                  Caracteristicas adicionales{" "}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </legend>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex w-full flex-col justify-center gap-4 p-4">
                  <div className="flex items-center space-x-2">
                    <Label className="w-1/3" htmlFor="m2">
                      Metros Cuadrados
                    </Label>
                    <FormField
                      control={form.control}
                      name="meters"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <SliderRange
                              min={10}
                              max={400}
                              minStepsBetweenThumbs={10}
                              formatLabel={(value) => `${value}m²`}
                              step={10}
                              onValueChange={(value) => field.onChange(value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <Label htmlFor="year">Año de construccion</Label>
                    <Input
                      id="year"
                      placeholder="Ingrese el año de construccion"
                      type="number"
                    />
                  </div> */}
                  <div className="flex items-center space-x-2">
                    <Label className="w-1/3" htmlFor="parking">
                      Estacionamiento
                    </Label>
                    <FormField
                      control={form.control}
                      name="parking"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              id="parking"
                              onCheckedChange={(value) => field.onChange(value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <Label className="w-1/3" htmlFor="storage">
                      Bodega
                    </Label>
                    <Checkbox id="storage" />
                  </div> */}
                  <div className="flex items-center space-x-2">
                    <Label className="w-1/3" htmlFor="furnished">
                      Amoblado
                    </Label>
                    <FormField
                      control={form.control}
                      name="furnished"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              id="furnished"
                              onCheckedChange={(value) => field.onChange(value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="price-min"
                          placeholder="15k"
                          type="number"
                          onChange={(e) => {
                            field.onChange([e.target.value, field.value[1]]);
                            e.target.value = currencyFormat(Number(e.target.value))
                          }}
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                          id="price-max"
                          placeholder="250k"
                          type="number"
                          onChange={(e) => {
                            field.onChange([field.value[0], e.target.value]);
                            e.target.value = currencyFormat(Number(e.target.value))
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label className="w-1/3" htmlFor="additional-costs">
                Gastos Comunes
              </Label>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="costs"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="costs-min"
                            placeholder="15k"
                            type="number"
                            onChange={(e) => {
                              field.onChange([e.target.value, field.value[1]]);
                            }}
                          />
                          <span className="text-muted-foreground">-</span>
                          <Input
                            id="costs-max"
                            placeholder="70k"
                            type="number"
                            onChange={(e) => {
                              field.onChange([field.value[0], e.target.value]);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="other-details">Detalles Adicionales</Label>
              <FormField
                control={form.control}
                name="aditionalInfo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea
                        className="min-h-[100px]"
                        id="other-details"
                        placeholder="Ingresa otros detalles que quieras mencionar"
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
