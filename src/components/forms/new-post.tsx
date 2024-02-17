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

const OPTIONS: any[] = [
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

export default function NewPostForm() {
  return (
    <div className="flex h-max w-full flex-col items-center gap-4 overflow-y-scroll p-2">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-lg">Mostrar Contacto Publico</CardTitle>
          <CardDescription>Como queres que te contacten?</CardDescription>
        </CardHeader>
        <CardContent className="grid items-center gap-6 px-10 md:grid-cols-2 md:gap-2">
          <Button size={"sm"} className="py-8" variant="outline">
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
          <Button size={"sm"} className="py-8" variant="outline">
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
        </CardContent>
      </Card>
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-lg">Ubicacion</CardTitle>
          <CardDescription>Selecciona donde estas buscando.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="region">Region</Label>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecciona una region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.region} value={region.region}>
                    {region.region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="commune">Commune</Label>
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecciona una comuna" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectGroup key={region.region} label={region.region}>
                    {region.comunas.map((comuna) => (
                      <SelectItem key={comuna} value={comuna}>
                        {comuna}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="city">Zona (Mapa)</Label>
            <Input disabled id="city" placeholder="Proximamente" />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-5xl">
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
            <SliderRange min={0} max={10} minStepsBetweenThumbs={1} step={1} />
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
                    min={0}
                    max={6}
                    minStepsBetweenThumbs={1}
                    step={1}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="year">Año de construccion</Label>
                  <Input
                    id="year"
                    placeholder="Ingrese el año de construccion"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="parking">Estacionamiento</Label>
                  <Checkbox id="parking" />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="storage">Bodega</Label>
                  <Checkbox id="storage" />
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="furnished">Amoblado</Label>
                  <Checkbox id="furnished" />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-lg">Pricing and Costs</CardTitle>
          <CardDescription>
            Enter the pricing and costs information.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="price">Price</Label>
            <SliderRange
              min={0}
              max={100}
              minStepsBetweenThumbs={10}
              step={5}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="additional-costs">Additional Costs</Label>
            <Input
              id="additional-costs"
              placeholder="Enter additional costs"
              type="number"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="other-details">Other Details</Label>
            <Textarea
              className="min-h-[100px]"
              id="other-details"
              placeholder="Enter other details"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
