import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Country, IState, State } from 'country-state-city';
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



type StateInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> &
{
    onChange?: (value: string) => void;
    country?: string
    value?: string
};

const StateInput: React.ForwardRefExoticComponent<StateInputProps> =
    React.forwardRef<HTMLInputElement, StateInputProps>(
        ({ className, onChange, country, value, ...props }, ref) => {
            const selectedCountry = country ? Country.getAllCountries().find(state => state.name === country) : null
            return (
                <StateSelect value={value} onChange={(value) => value && onChange ? onChange(value) : undefined} options={selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : State.getAllStates()} className={cn("flex", className)} />
            );
        },
    );
StateInput.displayName = "StateInput";

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


type StateSelectProps = {
    disabled?: boolean;
    value: string | number | readonly string[] | undefined;
    onChange: (value: string) => void;
    options: IState[];
    className?: string
};

const StateSelect = ({
    disabled,
    value,
    options,
    className,
    onChange,
}: StateSelectProps) => {

    const handleSelect = React.useCallback(
        (name: string) => {
            onChange(name);
        },
        [onChange],
    );
    const selectedState = options.find(state => state.name === value)
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
                            {selectedState ? (
                                <div className="">{selectedState?.name}</div>
                            ) : (
                                <div className="text-muted-foreground">Select State</div>
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
                    <CommandInput placeholder="Search state..." />
                    <CommandList>
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup>
                            {options
                                .filter((x) => x.isoCode)
                                .map((option) => (
                                    <CommandItem
                                        className="gap-2"
                                        key={option.isoCode}
                                        onSelect={() => handleSelect(option.name)}
                                    >
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


export { StateInput };
