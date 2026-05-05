# Security Specification for Firestore Rules

## 1. Data Invariants
- A lead must have a valid name, email, and message.
- A lead's `createdAt` must be the server time.
- Lead messages are "write-only" from the public perspective. Only authenticated admins can read them.

## 2. The "Dirty Dozen" Payloads
1. **Identity Spoofing**: Attempt to set a custom `leadId` that already exists.
2. **PII Leak**: Authenticated non-admin attempting to list `/leads`.
3. **Ghost Field**: Adding `isVerified: true` to a lead document.
4. **Invalid Type**: Sending a number as a `message`.
5. **Huge Payload**: Sending a 1MB string as a `name`.
6. **Missing Field**: Sending a lead without an `email`.
7. **Future Timestamp**: Sending a `createdAt` in the future.
8. **Owner Spoofing**: Attempting to update a lead's `email` after creation.
9. **Delete Attack**: Random user attempting to delete a lead.
10. **ID Poisoning**: Using a 2KB string as a document ID for a new lead.
11. **Email Spoofing**: Using an admin email but `email_verified` is false.
12. **Blanket Read**: Querying `/leads` without any filters as a guest.

## 3. Test Runner (Draft)
```typescript
// leads.test.ts
// Tests would go here to confirm that guests can only CREATE leads
// and only verified admins can READ leads.
```
