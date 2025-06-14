The following diagram was created with Github Copilot chat functionality, by adding the tests/e2e/class-based as context and with the prompt below:

> Create a Mermaid TD chart for the UserValidator. Create the sequences of validations of a chain and the group of validations of a composite. The Validators, Chains, Composites and Validations should have a specific color. The font color should be black.

```mermaid
flowchart TD
    %% Color definitions
    classDef validator fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#000;
    classDef chain fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#000;
    classDef composite fill:#e8f5e9,stroke:#388e3c,stroke-width:2px,color:#000;
    classDef validation fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#000;

    %% Entities
    UserValidator["UserValidator"]:::validator
    ProfileComposite["ProfileComposite"]:::composite
    AddressChain["AddressChain"]:::chain

    %% ProfileComposite group
    ProfileComposite --> NameValidation["NameValidation"]:::validation
    ProfileComposite --> AgeValidation["AgeValidation"]:::validation
    ProfileComposite --> EmailChain["EmailChain"]:::chain

    %% EmailChain sequence
    EmailChain --> EmailIsRequiredValidation["EmailIsRequiredValidation"]:::validation
    EmailIsRequiredValidation --> EmailLengthValidation["EmailLengthValidation"]:::validation
    EmailLengthValidation --> EmailMaxLengthValidation["EmailMaxLengthValidation"]:::validation
    EmailMaxLengthValidation --> EmailFormatComposite["EmailFormatComposite"]:::composite

    %% EmailFormatComposite group
    EmailFormatComposite --> EmailHasAtSignValidation["EmailHasAtSignValidation"]:::validation
    EmailFormatComposite --> EmailHasDomainValidation["EmailHasDomainValidation"]:::validation

    %% AddressChain sequence
    AddressChain --> StreetValidation["StreetValidation"]:::validation
    AddressChain --> ZipCodeValidation["ZipCodeValidation"]:::validation

    %% UserValidator composition
    UserValidator --> ProfileComposite
    UserValidator --> AddressChain
```
