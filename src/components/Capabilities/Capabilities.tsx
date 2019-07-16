import React from 'react';
import cx from 'classnames';
import TextCard from '@components/TextCard';
import { Element } from '@lib/types';
import { useId } from '@lib/hooks';
import './Capabilities.scss';

const CARDS = [
  {
    heading: `Web Consulting`,
    content: `Have a hairy challenge that you just aren't sure how to handle on the web? We can probably help, and if we can't, we can definitely point you in the right direction.`,
  },
  {
    heading: `Digital Strategy`,
    content: `You have a business to run, and you need real results from your digital properties. We've got the goods to deliver and leave an impression along the way.`,
  },
  {
    heading: `Product Design`,
    content: `We've got an eye for detail and we're not afraid to use it. Whatever you aim to build, we can build it beautiful and build it right from the ground up.`,
  },
  {
    heading: `Web Development`,
    content: `Our bread and butter. Let us turn your digital dreams into reality using modern tools and best practices for today's blazing-fast, ever-changing internet.`,
  },
];

export interface CapabilitiesProps extends Element<'section'> {}

const Capabilities: React.FC<CapabilitiesProps> = ({ className, ...props }) => {
  const titleId = useId('capes');
  return (
    <section
      aria-labelledby={titleId}
      className={cx('Capabilities', className)}
      {...props}
    >
      <div className="Capabilities__container">
        <h2 id={titleId} className="Capabilities__heading">
          Things We Do
        </h2>
        <ul className="Capabilities__list">
          {CARDS.map(card => (
            <li key={card.heading} className="Capabilities__item">
              <TextCard {...card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Capabilities;
