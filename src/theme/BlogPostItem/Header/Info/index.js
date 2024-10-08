import React from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import styles from './styles.module.css';


function useReadingTimePlural() {
  const { selectMessage } = usePluralForm();
  return (readingTimeFloat) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        { readingTime },
      ),
    );
  };
}

function ReadingTime({ readingTime }) {
  const readingTimePlural = useReadingTimePlural();
  return <>{readingTimePlural(readingTime)}</>;
}

function Date({ date, formattedDate }) {
  return (
    <time dateTime={date} itemProp="datePublished">
      {formattedDate}
    </time>
  );
}

function Spacer() {
  return <>{' · '}</>;
}


export default function InfoWrapper({
  className,
}) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { date, formattedDate, readingTime } = metadata;


  return (
    <>
      {isBlogPostPage ? (
        <div className={clsx(styles.container, 'margin-vert--md', className)}>
          <Date date={date} formattedDate={formattedDate} />
          {typeof readingTime !== 'undefined' && (
            <>
              <Spacer />
              <ReadingTime readingTime={readingTime} />
            </>
          )}
        </div>
      ) : (
        ''
      )}

    </>

  );
}
