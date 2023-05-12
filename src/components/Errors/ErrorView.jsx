import { ErrorText } from './ErrorView.styled';

export default function ErrorViev({ message }) {
  return (
    <div role="alert">
      <ErrorText>{message}</ErrorText>
    </div>
  );
}
