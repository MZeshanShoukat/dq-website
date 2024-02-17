import React, { useEffect, useState } from 'react';
import { BlogPostProvider } from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme/BlogPostItem';
import clsx from 'clsx';
import useGlobalData from '@docusaurus/useGlobalData';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';



export default function BlogPostItemsWrapper({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}) {
  const [tagsArray, setTagsArray] = useState([])
  const [tags, setTagsList] = useState([])
  const data = useGlobalData();
  const [activeButton, setActiveButton] = useState('all');
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      {

        let parsed = (url) => {
          var parts = url.split("/");
          if (parts[parts.length - 2] === 'tags') {
            setActiveButton(parts[parts.length - 1])
            return parts[parts.length - 1]
          }
          setActiveButton('all')
          return ''
        }
        parsed(location.pathname)
         // console.log('location == > ' ,items ) 
        //  console.log('location == > ' , location.pathname, siteConfig)

        /// -------- new will delete later
        { items && items.map((element) => (
          element.content.frontMatter.tags.forEach(ele => {
            let jsonObj = {
              label: ele,
              permalink: ele
            }
            tagsArray.push(jsonObj)
          })
        ))}
        let jsonObj = {
          label: 'all',
          permalink: siteConfig.baseUrl + 'blog'
        }
        tagsArray.splice(0, 0, jsonObj)

        /// -------- old with plugin keep it later
        // if (data) {
        //   let record1 = data['docusaurus-plugin-content-blog'].blog.blogTags
        //   Object.keys(record1)
        //     .forEach(function eachKey(key) {

        //       tagsArray.push(record1[key])
        //     });
        //   let jsonObj = {
        //     label: 'all',
        //     permalink: siteConfig.baseUrl + 'blog'
        //   }
        //   tagsArray.splice(0, 0, jsonObj)
        // }
       const uniqueArr = tagsArray.map(item => item.label).filter((value, index, self) => self.indexOf(value) === index);
        // uniqueArr.splice(0, 0, 'all')
        setTagsList(uniqueArr);

      }
    }

    return () => {
      ignore = true;
    }

  }, [tagsArray]);


  const hasSidebar = true;
  const clickButtonHandler = (value) => {
    setActiveButton(value)
  }


  return (
    <>
      <div>
        <nav class="categories-blog">
          {tags.map((items, i) => (
            <a
              key={i}
              className={activeButton === items ? 'active' : ''}
              onClick={(e) => clickButtonHandler(items)}
              href={  items != 'all' ? siteConfig.baseUrl + `${'blog/tags/'}`+ items : siteConfig.baseUrl + `${'blog'}` }
            >
              <span>{items}</span></a>
          ))}
        </nav>
      </div>
      <div className="row">
        {items.map(({ content: BlogPostContent }) => (
          <BlogPostProvider
            key={BlogPostContent.metadata.permalink}
            content={BlogPostContent}>
            <div
              className={clsx('col', {
                'col--4 margin-bottom--lg': hasSidebar,
                'col--9 col--offset-1': !hasSidebar,
              })}>

              <BlogPostItemComponent>
                <BlogPostContent />
              </BlogPostItemComponent>
            </div>
          </BlogPostProvider>
        ))}
      </div>
    </>
  );
}


