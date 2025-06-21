The following diagram was created with Github Copilot chat functionality, by adding the tests/e2e/function-based as context and with the prompt below:

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

    %% Top-level composites and chains
    UserValidator --> MainComposite["Main Composite"]:::composite
    UserValidator --> AddressChain["Address Chain"]:::chain

    %% MainComposite group
    MainComposite --> NameValidation["Name Validation"]:::validation
    MainComposite --> AgeValidation["Age Validation"]:::validation
    MainComposite --> EmailChain["Email Chain"]:::chain

    %% EmailChain sequence
    EmailChain --> EmailIsRequired["Email Is Required"]:::validation
    EmailIsRequired --> EmailLength["Email Length"]:::validation
    EmailLength --> EmailMaxLength["Email Max Length"]:::validation
    EmailMaxLength --> EmailFormatComposite["Email Format Composite"]:::composite

    %% EmailFormatComposite group
    EmailFormatComposite --> EmailHasAtSign["Email Has @ Sign"]:::validation
    EmailFormatComposite --> EmailHasDomain["Email Has Domain"]:::validation

    %% AddressChain sequence
    AddressChain --> StreetValidation["Street Validation"]:::validation
    StreetValidation --> ZipCodeValidation["Zip Code Validation"]:::validation

    %% Class assignments
    class UserValidator validator
    class MainComposite,EmailFormatComposite composite
    class EmailChain,AddressChain chain
    class NameValidation,AgeValidation,EmailIsRequired,EmailLength,EmailMaxLength,EmailHasAtSign,EmailHasDomain,StreetValidation,ZipCodeValidation validation
```
