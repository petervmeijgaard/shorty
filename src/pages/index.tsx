import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import ErrorNotification from '../components/ErrorNotification';
import FadeTransition from '../components/FadeTransition';
import Form from '../components/Form';
import LoadingIcon from '../components/LoadingIcon';
import Overlay from '../components/Overlay';
import SuccessNotification from '../components/SuccessNotification';
import TextInput from '../components/TextInput';
import { useDelayedLoading } from '../hooks/useDelayedLoading';
import { copyToClipboard } from '../utils/copyToClipboard';
import { useMutation } from '../utils/trpc';

const AddLink: NextPage = () => {
  const [url, setUrl] = useState('');
  const shortenUrlMutation = useMutation('shorty.shortenUrl', {
    onSuccess: copyToClipboard,
    onSettled: () => setUrl(''),
  });

  const isDelayedLoading = useDelayedLoading(shortenUrlMutation.isLoading);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    shortenUrlMutation.mutate(url);
  };

  return (
    <>
      <Card className="lg:w-1/2">
        {shortenUrlMutation.isSuccess && (
          <SuccessNotification>
            Success! Your shortened URL has been copied to your clipboard
          </SuccessNotification>
        )}
        {shortenUrlMutation.isError && (
          <ErrorNotification>
            Whoops! Something went wrong. Please make sure you have entered a
            valid URL.
          </ErrorNotification>
        )}
        <Form className="sm:flex-row" onSubmit={onSubmit}>
          <TextInput
            type="url"
            required
            placeholder="Enter URL to short"
            value={url}
            onInput={event => setUrl(event.currentTarget.value)}
          />
          <Button disabled={shortenUrlMutation.isLoading}>Shorten URL</Button>
        </Form>
      </Card>
      <FadeTransition isVisible={isDelayedLoading}>
        <Overlay>
          <LoadingIcon className="text-7xl text-slate-50" />
        </Overlay>
      </FadeTransition>
    </>
  );
};

export default AddLink;
