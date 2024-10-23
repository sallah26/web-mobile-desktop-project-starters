import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Country, ICountry } from 'country-state-city';
import * as React from "react";

import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Input,
    InputProps,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScrollArea,
    cn
} from "@/components";



type CountryInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> &
{
    onChange?: (value: string) => void;
    value?: string
};

const CountryInput: React.ForwardRefExoticComponent<CountryInputProps> =
    React.forwardRef<HTMLInputElement, CountryInputProps>(
        ({ className, onChange, value, ...props }, ref) => {
            return (
                <CountrySelect value={value} onChange={(value) => value && onChange ? onChange(value) : undefined} options={Country.getAllCountries()} className={cn("flex", className)} />
            );
        },
    );
CountryInput.displayName = "CountryInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
        <Input
            className={cn("rounded-e-md rounded-s-none h-12", className)}
            {...props}
            ref={ref}
        />
    ),
);
InputComponent.displayName = "InputComponent";


type CountrySelectProps = {
    disabled?: boolean;
    value: string | number | readonly string[] | undefined;
    onChange: (value: string) => void;
    options: ICountry[];
    className?: string
};

const CountrySelect = ({
    disabled,
    value,
    onChange,
    options,
    className
}: CountrySelectProps) => {

    const handleSelect = React.useCallback(
        (name: string) => {
            onChange(name);
        },
        [onChange],
    );
    const selectedCountry = options.find(country => country.name === value)
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant={"outline"}
                    className={cn("flex gap-1 rounded-x-md h-12 w-full px-3", className)}
                    disabled={disabled}
                >
                    <div className="w-full flex justify-between items-center">
                        <div className="w-full flex gap-2 items-center">
                            <FlagComponent flag={selectedCountry?.flag} />
                            {selectedCountry ? (
                                <div className="">{selectedCountry?.name}</div>
                            ) : (
                                <div className="text-muted-foreground">Select Country</div>
                            )}
                        </div>
                        <ChevronsUpDown
                            className={cn(
                                "h-4 opacity-50",
                                disabled ? "hidden" : "opacity-100",
                            )}
                        />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {options
                                .filter((x) => x.isoCode)
                                .map((option) => (
                                    <CommandItem
                                        className="gap-2"
                                        key={option.isoCode}
                                        onSelect={() => handleSelect(option.name)}
                                    >
                                        <FlagComponent
                                            flag={option.flag}
                                        />
                                        <span className="flex-1 text-sm">{option.name}</span>
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                option.name === value ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const FlagComponent = ({ flag }: { flag: ICountry["flag"] | undefined }) => {
    return (
        <span className="text-lg">
            {flag}
        </span>
    );
};
FlagComponent.displayName = "FlagComponent";

export { CountryInput };
