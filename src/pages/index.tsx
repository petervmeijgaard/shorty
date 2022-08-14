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
import useDelayedLoading from '../hooks/useDelayedLoading';
import FadeTransition from '../components/FadeTransition';
import copyToClipboard from '../utils/copyToClipboard';

const AddLink: NextPage = () => {
  const [url, setUrl] = useState('');
  const shortenUrlMutation = trpc.useMutation('shorty.shortenUrl');

  const isDelayedLoading = useDelayedLoading(shortenUrlMutation.isLoading);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const shortUrl = await shortenUrlMutation.mutateAsync(url);

      await copyToClipboard(shortUrl);

      setUrl('');
    } catch (e){
      //
    }
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
            Whoops! Something went wrong. Please make sure you have entered a valid URL.
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
