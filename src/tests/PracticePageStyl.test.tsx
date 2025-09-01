import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../components/theme';
import {
  Container,
  Header,
  PageHeader,
  Column,
  Form,
  FormGroup,
  Label,
  Description,
  CheckboxLabel,
  CheckboxInput,
  Input,
  Button,
  Example,
  Iframe,
} from '../components/PracticePageStyl';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('PracticePageStyl Styled Components', () => {
  describe('Container', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Container>Content</Container>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        display: 'flex',
        gap: '20px',
        padding: '20px',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<Container>Test Content</Container>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies flexbox layout correctly', () => {
      const { container } = renderWithTheme(<Container>Content</Container>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.display).toBe('flex');
    });
  });

  describe('Header', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Header>Header Content</Header>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        position: 'sticky',
        top: '0',
        padding: '20px',
        zIndex: '1000',
        width: '100%',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<Header>Header Text</Header>);
      expect(screen.getByText('Header Text')).toBeInTheDocument();
    });

    it('applies sticky positioning correctly', () => {
      const { container } = renderWithTheme(<Header>Content</Header>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.position).toBe('sticky');
    });
  });

  describe('PageHeader', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(
        <PageHeader>Page Title</PageHeader>
      );
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3em',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<PageHeader>Page Title</PageHeader>);
      expect(screen.getByText('Page Title')).toBeInTheDocument();
    });

    it('applies flexbox centering correctly', () => {
      const { container } = renderWithTheme(<PageHeader>Content</PageHeader>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.alignItems).toBe('center');
      expect(computedStyle.justifyContent).toBe('center');
    });
  });

  describe('Column', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Column>Column Content</Column>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        flex: '1',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<Column>Column Text</Column>);
      expect(screen.getByText('Column Text')).toBeInTheDocument();
    });

    it('applies flex grow correctly', () => {
      const { container } = renderWithTheme(<Column>Content</Column>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.flex).toBe('1 1 0%');
    });
  });

  describe('Form', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Form>Form Content</Form>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<Form>Form Elements</Form>);
      expect(screen.getByText('Form Elements')).toBeInTheDocument();
    });

    it('applies flexbox column layout correctly', () => {
      const { container } = renderWithTheme(<Form>Content</Form>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.flexDirection).toBe('column');
    });
  });

  describe('FormGroup', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(
        <FormGroup>Group Content</FormGroup>
      );
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<FormGroup>Group Elements</FormGroup>);
      expect(screen.getByText('Group Elements')).toBeInTheDocument();
    });

    it('applies flexbox column layout correctly', () => {
      const { container } = renderWithTheme(<FormGroup>Content</FormGroup>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.flexDirection).toBe('column');
    });
  });

  describe('Label', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Label>Label Text</Label>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        marginBottom: '10px',
        fontWeight: 'bold',
        display: 'block',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<Label>Form Label</Label>);
      expect(screen.getByText('Form Label')).toBeInTheDocument();
    });

    it('applies block display correctly', () => {
      const { container } = renderWithTheme(<Label>Content</Label>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.display).toBe('block');
    });
  });

  describe('Description', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(
        <Description>Description text</Description>
      );
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        textAlign: 'left',
        color: 'rgb(128, 128, 128)',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<Description>Help text</Description>);
      expect(screen.getByText('Help text')).toBeInTheDocument();
    });

    it('applies text alignment correctly', () => {
      const { container } = renderWithTheme(<Description>Content</Description>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.textAlign).toBe('left');
    });
  });

  describe('CheckboxLabel', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(
        <CheckboxLabel>Checkbox Label</CheckboxLabel>
      );
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        marginBottom: '10px',
        fontWeight: 'bold',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<CheckboxLabel>Checkbox Text</CheckboxLabel>);
      expect(screen.getByText('Checkbox Text')).toBeInTheDocument();
    });

    it('applies bold font weight correctly', () => {
      const { container } = renderWithTheme(
        <CheckboxLabel>Content</CheckboxLabel>
      );
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.fontWeight).toBe('bold');
    });
  });

  describe('CheckboxInput', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<CheckboxInput type='checkbox' />);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        padding: '10px',
        width: '300px',
        border: '1px solid #ccc',
        borderRadius: '5px',
      });
    });

    it('applies input styles correctly', () => {
      const { container } = renderWithTheme(<CheckboxInput type='checkbox' />);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.width).toBe('300px');
      expect(computedStyle.borderRadius).toBe('5px');
    });

    it('maintains input functionality', () => {
      const { container } = renderWithTheme(
        <CheckboxInput type='checkbox' data-testid='checkbox' />
      );
      const element = container.firstChild as HTMLInputElement;

      expect(element.type).toBe('checkbox');
      expect(element).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Input', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Input type='text' />);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        padding: '10px',
        width: '300px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '10px 20px 15px',
      });
    });

    it('applies input styles correctly', () => {
      const { container } = renderWithTheme(<Input type='text' />);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.width).toBe('300px');
      expect(computedStyle.borderRadius).toBe('5px');
    });

    it('maintains input functionality', () => {
      const { container } = renderWithTheme(
        <Input type='text' data-testid='input' />
      );
      const element = container.firstChild as HTMLInputElement;

      expect(element.type).toBe('text');
      expect(element).toBeInstanceOf(HTMLInputElement);
    });

    it('applies margin spacing correctly', () => {
      const { container } = renderWithTheme(<Input type='text' />);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.margin).toBe('10px 20px 15px');
    });
  });

  describe('Button', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Button>Button Text</Button>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        padding: '10px 20px 15px 20px',
        backgroundColor: '#0070f3',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '200px',
        margin: '10px 20px 15px 20px',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<Button>Click Me</Button>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('applies button styles correctly', () => {
      const { container } = renderWithTheme(<Button>Content</Button>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.backgroundColor).toBe('rgb(0, 112, 243)');
      expect(computedStyle.color).toBe('rgb(255, 255, 255)');
      expect(computedStyle.cursor).toBe('pointer');
    });

    it('applies margin spacing correctly', () => {
      const { container } = renderWithTheme(<Button>Content</Button>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.margin).toBe('10px 20px 15px');
    });
  });

  describe('Example', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Example>Example Content</Example>);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
      });
    });

    it('renders children correctly', () => {
      renderWithTheme(<Example>Example Text</Example>);
      expect(screen.getByText('Example Text')).toBeInTheDocument();
    });

    it('applies border styles correctly', () => {
      const { container } = renderWithTheme(<Example>Content</Example>);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.border).toBe('1px solid rgb(204, 204, 204)');
      expect(computedStyle.borderRadius).toBe('5px');
    });
  });

  describe('Iframe', () => {
    it('renders with correct styles', () => {
      const { container } = renderWithTheme(<Iframe src='test.html' />);
      const element = container.firstChild as HTMLElement;

      expect(element).toHaveStyle({
        width: '500px',
      });
    });

    it('maintains iframe functionality', () => {
      const { container } = renderWithTheme(
        <Iframe src='test.html' data-testid='iframe' />
      );
      const element = container.firstChild as HTMLIFrameElement;

      expect(element.tagName).toBe('IFRAME');
      expect(element.src).toContain('test.html');
    });

    it('applies width correctly', () => {
      const { container } = renderWithTheme(<Iframe src='test.html' />);
      const element = container.firstChild as HTMLElement;

      const computedStyle = window.getComputedStyle(element);
      expect(computedStyle.width).toBe('500px');
    });
  });

  describe('Component Integration', () => {
    it('renders multiple styled components together', () => {
      const { container } = renderWithTheme(
        <Container>
          <Header>
            <PageHeader>Practice Page</PageHeader>
          </Header>
          <Column>
            <Form>
              <FormGroup>
                <Label>Test Label</Label>
                <Input type='text' />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Column>
        </Container>
      );

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('Practice Page')).toBeInTheDocument();
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('maintains proper nesting structure', () => {
      const { container } = renderWithTheme(
        <Container>
          <Header>Header</Header>
          <Column>Column</Column>
        </Container>
      );

      const containerElement = container.firstChild as HTMLElement;
      expect(containerElement.children).toHaveLength(2);
      expect(containerElement.children[0].tagName).toBe('HEADER');
      expect(containerElement.children[1].tagName).toBe('DIV'); // Column
    });
  });

  describe('Responsive Behavior', () => {
    it('components render without crashing on different viewport sizes', () => {
      // Test with different viewport sizes
      const { rerender } = renderWithTheme(<Container>Content</Container>);

      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      rerender(
        <ThemeProvider theme={theme}>
          <Container>Content</Container>
        </ThemeProvider>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();

      // Simulate desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      rerender(
        <ThemeProvider theme={theme}>
          <Container>Content</Container>
        </ThemeProvider>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains semantic HTML structure', () => {
      const { container } = renderWithTheme(
        <Form>
          <FormGroup>
            <Label htmlFor='test-input'>Test Label</Label>
            <Input id='test-input' type='text' />
          </FormGroup>
        </Form>
      );

      const label = container.querySelector('label');
      const input = container.querySelector('input');

      expect(label).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('provides proper form structure', () => {
      const { container } = renderWithTheme(
        <Form>
          <FormGroup>
            <Label>Name</Label>
            <Input type='text' />
          </FormGroup>
          <Button type='submit'>Submit</Button>
        </Form>
      );

      const form = container.querySelector('form');
      const inputs = container.querySelectorAll('input');
      const button = container.querySelector('button');

      expect(form).toBeInTheDocument();
      expect(inputs).toHaveLength(1);
      expect(button).toHaveAttribute('type', 'submit');
    });
  });
});
