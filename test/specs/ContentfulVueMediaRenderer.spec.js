/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import ContentfulVueMediaRenderer from '../../src/ContentfulVueMediaRenderer';

describe('ContentfulVueMediaRenderer', () => {
  let component;
  const imageContent = {
    sys: {
      space: { sys: { type: 'Link', linkType: 'Space', id: 'spaceId' } },
      id: 'mediaId',
      type: 'Asset',
      createdAt: '2020-08-25T21:08:33.500Z',
      updatedAt: '2020-08-25T21:08:33.500Z',
      environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
      revision: 1,
      locale: 'en-US',
    },
    fields: {
      title: 'Laptop on a desk',
      file: {
        url: '//picsum.photos/200/300',
        details: { size: 231644, image: { width: 1951, height: 1301 } },
        fileName: 'picsum.jpg',
        contentType: 'image/jpeg',
      },
    },
  };

  afterEach(() => { component.destroy(); });

  beforeEach(() => {
    component = mount(ContentfulVueMediaRenderer);
  });

  it('should not render an image if no content is provided', () => {
    expect(component.find('img').exists()).to.be.false;
  });

  it('should render an image', async () => {
    await component.setProps({ content: imageContent });
    expect(component.find('img').exists()).to.be.true;
  });

  it('should render an image with the correct attributes', async () => {
    await component.setProps({ content: imageContent, mediaClass: 'img-responsive' });
    const img = component.get('img');
    expect(img.attributes('src')).to.be.string('//picsum.photos/200/300');
    expect(img.attributes('alt')).to.be.string('Laptop on a desk');
    expect(img.attributes('class')).to.be.string('img-responsive');
  });
});
