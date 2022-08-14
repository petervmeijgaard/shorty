import { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { FormEvent, useEffect, useState } from 'react';
import Card from '../components/Card';
import ErrorNotification from '../components/ErrorNotification';
import SuccessNotification from '../components/SuccessNotification';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Form from '../components/Form';
import LoadingIcon from '../components/LoadingIcon';
import Overlay from '../components/Overlay';
import useDelayedLoading from '../hooks/useDelayedLoading';
import FadeTransition from '../components/FadeTransition';
import copyToClipboard from '../utils/copy-to-clipboard';

const AddLink: NextPage = () => {
  const [url, setUrl] = useState('');
  const shortenUrlMutation = trpc.useMutation(['shorty.shortenUrl']);

  const isDelayedLoading = useDelayedLoading(shortenUrlMutation.isLoading);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await shortenUrlMutation.mutate(url);

    setUrl('');
  };

  const errors = shortenUrlMutation.error?.data?.zodError?.fieldErrors?.url || [];

  const hasErrors = errors.length > 0;

  useEffect(() => {
    if (!shortenUrlMutation.data) return;

    void copyToClipboard(shortenUrlMutation.data);
  }, [shortenUrlMutation.data]);

  return (
    <>
      <Card className="lg:w-1/2">
        {shortenUrlMutation.data && (
          <SuccessNotification>
            Success! Your shortened URL has been copied to your clipboard
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
      <FadeTransition
        duration={500}
        isVisible={isDelayedLoading}
      >
        <Overlay>
          <LoadingIcon className="text-7xl text-slate-50" />
        </Overlay>
      </FadeTransition>
    </>
  );
};

export default AddLink;
