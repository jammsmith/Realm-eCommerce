import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline
} from 'react-icons/io5';

import Testimonial from './Testimonial';
import colours from '../../../../styles/colours.js';

// Custom styled components
const CarouselWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 350px;
  @media (min-width: 768px) {
    max-width: 70%;
    margin: auto;
  }
  @media (min-width: 1024px) {
    max-width: 60%;
  }
  @media (min-width: 1280px) {
    max-width: 50%;
  }
`;

const Spacer = styled.div`
  width: 61.05px;
  height: 75px;
`;

const ForwardArrow = styled(IoArrowForwardCircleOutline)`
  font-size: 75px;
  color: ${colours.dark};
  :hover {
    cursor: pointer;
  }
`;
const BackArrow = styled(IoArrowBackCircleOutline)`
  font-size: 75px;
  color: ${colours.dark};
  :hover {
    cursor: pointer;
  }
`;

// Return a selection of testimonials
const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 0,
      heading: 'Allan Lavigne, California USA',
      text:
        "Diane knocked it out of the ballpark. When I first put it on straight out of the box it fit like a glove. The symmetry, stitching and lining were clean and professional. And the lines and silhouette were identical to Conrad's. I was so excited and couldn't have been happier with the fantastic work."
    },
    {
      id: 1,
      heading: 'Mr Kevin Groninga, Arizona USA',
      text:
        "My wife and I have purchased several leather items from Steve and I gotta say, we couldn't have been more pleased with the final products. Steve's attention to detail and craftsmanship is second to none!"
    },
    {
      id: 2,
      heading: 'Mrs A Sheppard, Bristol UK',
      text:
        'We were very impressed with the quality and professional workmanship you obviously put into your work. I am most grateful for all the help you gave me concerning the colour, design and authenticity prior to commissioning. I would not hesitate in recommending you and your workmanship to anyone.'
    },
    {
      id: 3,
      heading: 'Alan Williams, Hampshire UK',
      text:
        'Well strike me down "Hand of God" you certainly do have!  I was speechless for a minute or so. It is a wonderful piece of work and I am very impressed and will be one proud dude with these on my hips. So much I ordered cuffs and spur straps.'
    },
    {
      id: 4,
      heading: 'Mark Effner, Germany',
      text:
        "The rig arrived today and I can't believe how beautiful it is.  All the details and everything and you did all that in such a short time. Also the price, payment procedure and shipping... everything perfect. I wish that shopping over the internet would always be like this."
    },
    {
      id: 5,
      heading: "That's it here!",
      text:
        'but take a look at our testimonial page for even more kind words from our customers.'
    }
  ];

  const [content, setContent] = useState(testimonials[0]);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleBackClick = () => {
    let indexOfTestimonial = _.findIndex(testimonials, {
      heading: content.heading
    });

    if (indexOfTestimonial > 0) {
      indexOfTestimonial--;
      const previousItem = _.find(testimonials, { id: indexOfTestimonial });
      setContent(previousItem);
      setSlideIndex(indexOfTestimonial);
    }
  };

  const handleNextClick = () => {
    let indexOfTestimonial = _.findIndex(testimonials, {
      heading: content.heading
    });

    if (indexOfTestimonial < testimonials.length - 1) {
      indexOfTestimonial++;
      const nextItem = _.find(testimonials, { id: indexOfTestimonial });
      setContent(nextItem);
      setSlideIndex(indexOfTestimonial);
    }
  };

  return (
    <CarouselWrapper>
      {slideIndex > 0
        ? <BackArrow onClick={handleBackClick} />
        : <Spacer />}
      <Testimonial
        heading={content.heading}
        text={content.text}
        isLastSlide={slideIndex === testimonials.length - 1}
      />
      {slideIndex < testimonials.length - 1
        ? <ForwardArrow onClick={handleNextClick} />
        : <Spacer />}
    </CarouselWrapper>
  );
};

export default TestimonialCarousel;
