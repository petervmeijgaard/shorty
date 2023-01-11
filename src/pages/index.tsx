import { NextPage } from 'next';
import { FormEvent, useRef, useState } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ErrorNotification from '@/components/ErrorNotification';
import FadeTransition from '@/components/FadeTransition';
import Form from '@/components/Form';
import LoadingIcon from '@/components/LoadingIcon';
import Overlay from '@/components/Overlay';
import SuccessNotification from '@/components/SuccessNotification';
import TextInput from '@/components/TextInput';
import { useDelayedLoading } from '@/hooks/useDelayedLoading';
import { api } from '@/utils/api';
import { copyToClipboard } from '@/utils/copyToClipboard';

const AddLink: NextPage = () => {
  const [url, setUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = api.shorty.shortenUrl.useMutation();

  const isDelayedLoading = useDelayedLoading(mutation.isLoading);

  const shortenUrl = async () => {
    try {
      const result = await mutation.mutateAsync(url);

      await copyToClipboard(result);
    } catch (error) {
      // Do nothing right now...
    } finally {
      setUrl('');

      inputRef.current?.focus();
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    void shortenUrl();
  };

  return (
    <>
      <Card className="lg:w-1/2">
        {mutation.isSuccess && (
          <SuccessNotification>
            Success! Your shortened URL has been copied to your clipboard
          </SuccessNotification>
        )}
        {mutation.isError && (
          <ErrorNotification>
            Whoops! Something went wrong. Please make sure you have entered a
            valid URL.
          </ErrorNotification>
        )}
        <Form className="sm:flex-row" onSubmit={onSubmit}>
          <TextInput
            ref={inputRef}
            type="url"
            required
            placeholder="Enter URL to short"
            value={url}
            onInput={event => setUrl(event.currentTarget.value)}
          />
          <Button disabled={mutation.isLoading}>Shorten URL</Button>
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
