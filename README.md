# @ekaone/mask-email

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
import { maskEmail } from '@ekaone/mask-email';

maskEmail('ekaone3033@gmail.com');
// Output: 'ek********@gmail.com'
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

## API Reference

### `maskEmail(email, options?)`

Masks an email address according to the provided options.

#### Parameters

- **email** (`string`) - The email address to mask
- **options** (`EmailOptions`, optional) - Configuration options

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maskChar` | `string` | `'*'` | Character used for masking |
| `visibleChars` | `number` | `2` | Number of characters to remain visible at the beginning |
| `maskDomain` | `boolean` | `false` | If true, the domain part (after @) will also be masked |
| `viewable` | `boolean` | `false` | If true, returns the original email without masking |

#### Returns

- (`string`) - The masked email address

#### TypeScript Types

```typescript
interface EmailOptions {
  /** Character used for masking (default: '*') */
  maskChar?: string;
  /** Number of characters to remain visible at the beginning (default: 2) */
  visibleChars?: number;
  /** If true, returns the original email without masking (default: false) */
  viewable?: boolean;
  /** If true, the domain part (after @) will also be masked (default: false) */
  maskDomain?: boolean;
}
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
