# @ekaone/mask-email

<div align="center">
  <img src="https://res.cloudinary.com/ddjsyskef/image/upload/v1773999560/Github/k6uviiwrno6o352bp91j.png" alt="@ekaone/mask-email" />
</div>


A lightweight, zero-dependency TypeScript library for masking email addresses to protect user privacy.

[![npm version](https://img.shields.io/npm/v/@ekaone/mask-email.svg)](https://www.npmjs.com/package/@ekaone/mask-email)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

## Features

✨ **Lightweight** - Zero dependencies  
🔒 **Privacy-focused** - Mask sensitive email information  
📦 **TypeScript** - Full type safety and IntelliSense support  
⚙️ **Customizable** - Flexible masking options  
🎯 **Simple API** - Easy to use with sensible defaults

## Installation

```bash
npm install @ekaone/mask-email
```

```bash
yarn add @ekaone/mask-email
```

```bash
pnpm add @ekaone/mask-email
```

## Quick Start

```typescript
import { maskEmail, maskEmailBatch, validateEmail, isValidEmail, anonymizeEmail, anonymizeEmailBatch } from '@ekaone/mask-email';

maskEmail('ekaone3033@gmail.com');
// Output: 'ek********@gmail.com'

// Batch masking
maskEmailBatch(['john@example.com', 'jane@company.com']);
// Output: ['jo**@example.com', 'ja**@company.com']
```

## Usage Examples

### Basic Usage

```typescript
import { maskEmail } from '@ekaone/mask-email';

// Default masking (shows first 2 characters)
maskEmail('john.doe@example.com');
// Output: 'jo******@example.com'

maskEmail('admin@company.com');
// Output: 'ad***@company.com'
```

### Custom Visible Characters

Control how many characters remain visible at the beginning of the username:

```typescript
// Show first 4 characters
maskEmail('ekaone3033@gmail.com', { visibleChars: 4 });
// Output: 'ekao******@gmail.com'

// Show only 1 character
maskEmail('ekaone3033@gmail.com', { visibleChars: 1 });
// Output: 'e*********@gmail.com'
```

### Custom Mask Character

Change the masking character from the default `*`:

```typescript
maskEmail('user@example.com', { maskChar: '#' });
// Output: 'us##@example.com'

maskEmail('user@example.com', { maskChar: '•' });
// Output: 'us••@example.com'

maskEmail('user@example.com', { maskChar: '-' });
// Output: 'us--@example.com'
```

### Domain Masking

Mask the domain part of the email as well:

```typescript
// Mask domain
maskEmail('user@gmail.com', { maskDomain: true });
// Output: 'us**@g****.com'

// Works with subdomains
maskEmail('contact@mail.google.com', { maskDomain: true });
// Output: 'co*****@m***.g*****.com'
```

### Batch Masking

Process multiple emails at once with the same options:

```typescript
import { maskEmailBatch } from '@ekaone/mask-email';

// Basic batch masking
const emails = [
  'john.doe@example.com',
  'jane.smith@company.com',
  'admin@site.org'
];

maskEmailBatch(emails);
// Output: ['jo******@example.com', 'ja********@company.com', 'ad***@site.org']

// Batch with custom options
maskEmailBatch(emails, { visibleChars: 3, maskChar: '#' });
// Output: ['joh#####@example.com', 'jan#######@company.com', 'adm##@site.org']

// Batch with domain masking
maskEmailBatch(emails, { maskDomain: true });
// Output: ['jo******@ex******.com', 'ja********@co******.com', 'ad***@si**.org']
```

### Viewable Mode

Return the original email without masking (useful for admin views):

```typescript
maskEmail('secret@company.com', { viewable: true });
// Output: 'secret@company.com'
```

### Combined Options

Mix and match options for custom masking behavior:

```typescript
maskEmail('ekaone3033@gmail.com', {
  visibleChars: 3,
  maskChar: '-',
  maskDomain: true
});
// Output: 'eka-------@g----.com'

maskEmail('admin@mail.company.com', {
  visibleChars: 1,
  maskChar: '*',
  maskDomain: true
});
// Output: 'a****@m***.c******.com'
```

### Email Anonymization

Replace the username with a random identifier for complete privacy:

```typescript
import { anonymizeEmail, anonymizeEmailBatch } from '@ekaone/mask-email';

// Basic anonymization
anonymizeEmail('john.doe@company.com');
// Output: 'user_a1b2c3@*****.com'

// Custom prefix and ID length
anonymizeEmail('admin@example.com', { prefix: 'anon', idLength: 8 });
// Output: 'anon_x7y2k9m4@*******.com'

// Keep domain visible
anonymizeEmail('user@mail.google.com', { maskDomain: false });
// Output: 'user_h3j5k2@mail.google.com'

// Batch anonymization
const emails = ['user1@test.com', 'user2@test.com'];
anonymizeEmailBatch(emails);
// Output: ['user_a1b2c3@****.com', 'user_x7y8z9@****.com']
```

### Batch Email Masking

Process multiple emails with the same options:

```typescript
import { maskEmailBatch } from '@ekaone/mask-email';

const emails = [
  'john.doe@example.com',
  'jane.smith@company.com',
  'admin@site.org'
];

// Basic batch masking
maskEmailBatch(emails);
// Output: ['jo******@example.com', 'ja********@company.com', 'ad***@site.org']

// Batch with custom options
maskEmailBatch(emails, { visibleChars: 3, maskChar: '#' });
// Output: ['joh#####@example.com', 'jan#######@company.com', 'adm##@site.org']

// Batch with domain masking
maskEmailBatch(emails, { maskDomain: true });
// Output: ['jo******@ex******.com', 'ja********@co******.com', 'ad***@si**.org']
```

### Email Validation

Validate email format and optionally mask valid emails:

```typescript
import { validateEmail, isValidEmail } from '@ekaone/mask-email';

// Validate and get masked email
const result = validateEmail('test@example.com');
// Returns: { valid: true, original: 'test@example.com', masked: 'te**@example.com' }

// Validation with custom masking options
const custom = validateEmail('user@test.com', { visibleChars: 3 });
// Returns: { valid: true, original: 'user@test.com', masked: 'use*@test.com' }

// Invalid email
const invalid = validateEmail('invalid-email');
// Returns: { valid: false, original: 'invalid-email', masked: null, error: 'Invalid email format' }

// Quick boolean check
isValidEmail('test@example.com'); // true
isValidEmail('invalid'); // false
isValidEmail(''); // false
```

## API Reference

### `maskEmailBatch(emails, options?)`

Masks an array of email addresses with the same options applied to each email.

#### Parameters

- **emails** (`string[]`) - Array of email addresses to mask
- **options** (`EmailOptions`, optional) - Configuration options (same as `maskEmail`)

#### Returns

- (`string[]`) - Array of masked email addresses

#### Example

```typescript
const emails = ['user1@test.com', 'user2@demo.com'];
maskEmailBatch(emails, { visibleChars: 1 });
// Output: ['u***@test.com', 'u***@demo.com']
```

### `maskEmail(email, options?)`

Masks an email address according to the provided options.

#### Parameters

- **email** (`string`) - The email address to mask
- **options** (`EmailOptions`, optional) - Configuration options

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maskChar` | `string` | `'*'` | Character used for masking |
| `visibleChars` | `number` | `2` | Number of characters visible at the beginning |
| `visibleCharsEnd` | `number` | `0` | Number of characters visible at the end |
| `maskPercentage` | `number` | - | Mask based on percentage (0-100), takes precedence over visibleChars |
| `maskDomain` | `boolean \| 'full'` | `false` | Mask domain: `true`/'partial' masks parts keeping TLD, `'full'` masks entire domain |
| `viewable` | `boolean` | `false` | Return original email without masking |

#### Returns

- (`string`) - The masked email address

#### TypeScript Types

```typescript
interface EmailOptions {
  /** Character used for masking (default: '*') */
  maskChar?: string;
  /** Number of characters visible at the beginning (default: 2) */
  visibleChars?: number;
  /** Number of characters visible at the end (default: 0) */
  visibleCharsEnd?: number;
  /** Mask based on percentage (0-100), takes precedence over visibleChars */
  maskPercentage?: number;
  /** Return original email without masking (default: false) */
  viewable?: boolean;
  /** Mask domain: true/partial keeps TLD visible, 'full' masks entire domain (default: false) */
  maskDomain?: boolean | 'full';
}
```

### `validateEmail(email, options?)`

Validates an email address and returns a result object with validation status and optional masked email.

#### Parameters

- **email** (`string`) - The email address to validate
- **options** (`EmailOptions`, optional) - Masking options applied if email is valid

#### Returns

- (`EmailValidationResult`) - Object containing:
  - `valid` (`boolean`) - Whether the email format is valid
  - `original` (`string`) - The original email address
  - `masked` (`string | null`) - Masked email if valid, null if invalid
  - `error` (`string`, optional) - Error message if validation failed

#### Example

```typescript
const result = validateEmail('test@example.com');
// Returns: { valid: true, original: 'test@example.com', masked: 'te**@example.com' }

const invalid = validateEmail('invalid-email');
// Returns: { valid: false, original: 'invalid-email', masked: null, error: 'Invalid email format' }
```

#### TypeScript Types

```typescript
interface EmailValidationResult {
  valid: boolean;
  original: string;
  masked: string | null;
  error?: string;
}
```

### `isValidEmail(email)`

Quick boolean validation without masking. Returns `true` if the email is valid, `false` otherwise.

#### Parameters

- **email** (`string`) - The email address to validate

#### Returns

- (`boolean`) - `true` if valid, `false` otherwise

#### Example

```typescript
isValidEmail('test@example.com'); // true
isValidEmail('invalid'); // false
isValidEmail(''); // false
```

### `anonymizeEmail(email, options?)`

Anonymizes an email by replacing the username with a random identifier. Useful for complete privacy protection.

#### Parameters

- **email** (`string`) - The email address to anonymize
- **options** (`AnonymizeOptions`, optional) - Anonymization options

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `prefix` | `string` | `'user'` | Prefix for the anonymous identifier |
| `idLength` | `number` | `6` | Length of the random identifier |
| `maskDomain` | `boolean` | `true` | Whether to mask the domain part |

#### Returns

- (`string`) - Anonymized email address

#### Example

```typescript
anonymizeEmail('john.doe@company.com');
// Output: 'user_a1b2c3@*****.com'

anonymizeEmail('admin@example.com', { prefix: 'anon', idLength: 8 });
// Output: 'anon_x7y2k9m4@*******.com'

anonymizeEmail('user@mail.google.com', { maskDomain: false });
// Output: 'user_h3j5k2@mail.google.com'
```

#### TypeScript Types

```typescript
interface AnonymizeOptions {
  prefix?: string;
  idLength?: number;
  maskDomain?: boolean;
}
```

### `anonymizeEmailBatch(emails, options?)`

Batch anonymize multiple email addresses with the same options.

#### Parameters

- **emails** (`string[]`) - Array of email addresses to anonymize
- **options** (`AnonymizeOptions`, optional) - Anonymization options applied to all emails

#### Returns

- (`string[]`) - Array of anonymized email addresses

#### Example

```typescript
const emails = ['user1@test.com', 'user2@test.com'];
anonymizeEmailBatch(emails);
// Output: ['user_a1b2c3@****.com', 'user_x7y8z9@****.com']

anonymizeEmailBatch(emails, { prefix: 'anon' });
// Output: ['anon_k3m9p2@****.com', 'anon_q5n8r4@****.com']
```

## Real-World Use Cases

### Display Emails in UI

```typescript
const userEmail = 'customer@company.com';
const displayEmail = maskEmail(userEmail);

console.log(`Confirmation sent to: ${displayEmail}`);
// Output: "Confirmation sent to: cu******@company.com"
```

### Logging Sensitive Data

```typescript
const emails = [
  'admin@site.com',
  'user123@example.com',
  'contact@business.org'
];

emails.forEach(email => {
  console.log('Processing:', maskEmail(email, { visibleChars: 3 }));
});
// Output:
// Processing: adm**@site.com
// Processing: use****@example.com
// Processing: con****@business.org
```

### Role-Based Masking

```typescript
function getUserEmailForDisplay(email: string, userRole: string) {
  if (userRole === 'admin') {
    return maskEmail(email, { viewable: true });
  } else if (userRole === 'moderator') {
    return maskEmail(email, { visibleChars: 4, maskDomain: false });
  } else {
    return maskEmail(email, { visibleChars: 2, maskDomain: true });
  }
}

console.log(getUserEmailForDisplay('john@example.com', 'admin'));
// Output: 'john@example.com'

console.log(getUserEmailForDisplay('john@example.com', 'moderator'));
// Output: 'john@example.com'

console.log(getUserEmailForDisplay('john@example.com', 'user'));
// Output: 'jo**@e******.com'
```

### Privacy-Compliant Email Display

```typescript
// Show masked email in public profiles
function displayPublicProfile(user: { name: string; email: string }) {
  return {
    name: user.name,
    email: maskEmail(user.email, { maskDomain: true })
  };
}

const profile = displayPublicProfile({
  name: 'John Doe',
  email: 'john.doe@example.com'
});

console.log(profile);
// Output: { name: 'John Doe', email: 'jo******@e******.com' }
```

## Edge Cases

The library handles various edge cases gracefully:

```typescript
// Very short usernames
maskEmail('a@example.com', { visibleChars: 2 });
// Output: 'a@example.com' (shows all available characters)

// Invalid email format (no @ symbol)
maskEmail('notanemail');
// Output: 'notanemail' (returns as-is)

// Empty or null values
maskEmail('');
// Output: ''

maskEmail(null);
// Output: null

// Multiple @ symbols (technically invalid but handled)
maskEmail('user@name@domain.com');
// Output: 'us*******@domain.com' (uses last @ as separator)

// Subdomains
maskEmail('user@mail.google.com', { maskDomain: true });
// Output: 'us**@m***.g*****.com'
```

## Browser Support

This library works in all modern browsers and Node.js environments that support ES2015+.

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Node.js 14+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT © Eka Prasetia

## Links

- [npm Package](https://www.npmjs.com/package/@ekaone/mask-email)
- [GitHub Repository](https://github.com/ekaone/mask-email)
- [Issue Tracker](https://github.com/ekaone/mask-email/issues)

## Related Packages

- [Credit card masking library](https://github.com/ekaone/mask-card)
- [Token masking library](https://github.com/ekaone/mask-token)
- [Phone masking library](https://github.com/ekaone/mask-phone)

---

⭐ If this library helps you, please consider giving it a star on GitHub!
