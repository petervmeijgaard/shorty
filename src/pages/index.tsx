import { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { FormEvent, useState } from 'react';
import Card from '../components/Card';
import ErrorNotification from '../components/ErrorNotification';
import SuccessNotification from '../components/SuccessNotification';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Form from '../components/Form';
import LoadingIcon from '../components/LoadingIcon';
import Overlay from '../components/Overlay';

const AddLink: NextPage = () => {
  const [url, setUrl] = useState('');
  const shortenUrlMutation = trpc.useMutation(['shorty.shortenUrl']);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await shortenUrlMutation.mutate(url);

    setUrl('');
  };

  const errors = shortenUrlMutation.error?.data?.zodError?.fieldErrors?.url || [];

  const hasErrors = errors.length > 0;

  return (
    <>
      <Card className="lg:w-1/2">
        {shortenUrlMutation.data && (
          <SuccessNotification>
            Your shortened URL: {shortenUrlMutation.data}
          </SuccessNotification>
        )}
        {hasErrors && (
          <ErrorNotification>
            Whoops! Something went wrong &nbsp;
            {errors.map(errorMessage => (
              <span key={errorMessage}>{errorMessage}</span>
            ))}
          </ErrorNotification>
        )}
        <Form
          className="sm:flex-row"
          onSubmit={onSubmit}
        >
          <TextInput
            type="url"
            required
            placeholder="Enter URL to short"
            value={url}
            onInput={event => setUrl(event.currentTarget.value)}
          />
          <Button disabled={shortenUrlMutation.isLoading}>
            Shorten URL
          </Button>
        </Form>
      </Card>
      {shortenUrlMutation.isLoading && (
        <Overlay>
          <LoadingIcon className="text-7xl text-slate-50" />
        </Overlay>
      )}
    </>
  );
};

export default AddLink;
