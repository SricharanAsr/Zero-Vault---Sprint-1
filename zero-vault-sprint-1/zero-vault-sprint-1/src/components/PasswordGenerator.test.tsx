import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PasswordGenerator from './PasswordGenerator';

describe('PasswordGenerator', () => {
    it('renders correctly', () => {
        render(<PasswordGenerator />);
        expect(screen.getByText('Length')).toBeInTheDocument();
        expect(screen.getByText('Generate Password')).toBeInTheDocument();
    });

    it('generates a password when button is clicked', () => {
        const onGenerateMock = vi.fn();
        render(<PasswordGenerator onGenerate={onGenerateMock} />);

        const generateButton = screen.getByText('Generate Password');
        fireEvent.click(generateButton);

        expect(onGenerateMock).toHaveBeenCalled();
        const generatedPassword = onGenerateMock.mock.calls[0][0];
        expect(generatedPassword).toHaveLength(16); // Default length
    });

    it('changes password length', () => {
        const onGenerateMock = vi.fn();
        render(<PasswordGenerator onGenerate={onGenerateMock} />);

        const slider = screen.getByRole('slider', { hidden: true }) as HTMLInputElement;
        // Note: input type=range might not have accessible role implicit in all validtions, 
        // but let's try finding by value or just querySelector if role fails.
        // Actually, let's just use container query for simplicity if needed, but role slider should work with library.

        fireEvent.change(slider, { target: { value: '20' } });

        const generateButton = screen.getByText('Generate Password');
        fireEvent.click(generateButton);

        const generatedPassword = onGenerateMock.mock.calls[0][0];
        expect(generatedPassword).toHaveLength(20);
    });
});
