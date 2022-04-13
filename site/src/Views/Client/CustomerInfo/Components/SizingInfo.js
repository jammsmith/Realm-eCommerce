import React from 'react';
import styled from 'styled-components';

import Heading from '../../../../Components/Headings/Heading.js';
import DDTable from '../../../../Components/Table/DDTable.js';

import mensSizes from '../Sizes/mens.json';
import womensSizes from '../Sizes/womens.json';
import dressesAndEnsembles from '../Sizes/dressesAndEnsembles.json';

const SizesTable = styled.div`
  margin-top: 1rem;
`;

const SizingInfo = () => {
  return (
    <>
      <Heading text='How To Measure' size='small' />
      <div>
        <Heading text='Chest and Bust Measurement' size='x-small' />
        <p>
          Measure around the fullest part  of the chest or bust, taking care to keep the tape under
          the arms and around the shoulder blades. Read the measurement with the tape snug, not
          tight. The number of inches is your correct size.
        </p>
      </div>
      <div>
        <Heading text='Waist Measurement' size='x-small' />
        <p>
        Measure around your waist, over your shirt (not over trousers) at your natural waist line. The
        number of inches is your correct size.
        </p>
        <p>
          <strong>Note:</strong> if you wear your trousers below your stomach, we will also require your
          stomach measurement at it's largest point.
        </p>
      </div>
      <div>
        <Heading text='Seat/Hips Measurement' size='x-small' />
        <p>
          Stand with your heels together and measure around the fullest part. The number of inches is
          your correct size.
        </p>
      </div>
      <div>
        <Heading text='Sleeve Length Measurement' size='x-small' />
        <p>
          Measure with your arm raised level with shoulder. Start the tape level with the raised arm at the
          exact middle of the back at the neck between the shoulder blades. From the middle of your back,
          around the elbow to one inch past the wrist joint. The number of inches is your sleeve length.
        </p>
      </div>
      <div>
        <Heading text='Neck Size Measurement' size='x-small' />
        <p>
          Measure around your neck at the point your shirt collar button would be. The number of inches shown
          is your correct size.
        </p>
      </div>
      <div>
        <Heading text='Size Charts' size='small' />
        <p>
          <strong>PLEASE NOTE: </strong>The charts below are intended as a guide only. Garments vary
          from one pattern to another.  The style and cut may affect the fit of a garment. The comfort
          factor should also be considered. Some people wear their clothes looser or tighter than others.
          If you are uncertain about which size to choose, please call and we'll be happy to help you.
        </p>
        <SizesTable>
          <Heading text='Mens (Shirts)' size='x-small' />
          <DDTable
            rows={mensSizes}
            columns={[
              { name: 'size', label: 'Size' },
              { name: 'chest', label: 'Chest' },
              { name: 'neck', label: 'Neck' },
              { name: 'sleeve', label: 'Sleeve' }
            ]}
            size='small'
          />
        </SizesTable>
        <SizesTable>
          <Heading text='Womens' size='x-small' />
          <DDTable
            rows={womensSizes}
            columns={[
              { name: 'size', label: 'Size' },
              { name: 'bust', label: 'Bust' },
              { name: 'waist', label: 'Waist' },
              { name: 'hips', label: 'Hips' }
            ]}
            size='small'
          />
        </SizesTable>
        <SizesTable>
          <Heading text='Dresses and Ensembles' size='x-small' />
          <DDTable
            rows={dressesAndEnsembles}
            columns={[
              { name: 'size', label: 'Size' },
              { name: 'sizeNum', label: 'Size No.' },
              { name: 'bust', label: 'Bust' },
              { name: 'waist', label: 'Waist' }
            ]}
            size='small'
          />
        </SizesTable>
      </div>
    </>
  );
};

export default SizingInfo;
