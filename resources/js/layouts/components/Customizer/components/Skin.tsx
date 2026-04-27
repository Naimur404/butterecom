import defaultImg from '@/images/layouts/skin-default.png'

import flatImg from '@/images/layouts/skin-flat.png'
import galaxyImg from '@/images/layouts/skin-galaxy.png'

import materialImg from '@/images/layouts/skin-material.png'

import minimalImg from '@/images/layouts/skin-minimal.png'
import modernImg from '@/images/layouts/skin-modern.png'

import neonImg from '@/images/layouts/skin-neon.png'

import pixelImg from '@/images/layouts/skin-pixel.png'

import retroImg from '@/images/layouts/skin-retro.png'
import saasImg from '@/images/layouts/skin-saas.png'

import { useLayoutContext } from '@/context/useLayoutContext'
import { toTitleCase } from '@/utils/helpers'
import type { CustomizationOptionType } from '../index'

const skinOptions: CustomizationOptionType[] = [
  { value: 'default', image: defaultImg },
  { value: 'minimal', image: minimalImg },
  { value: 'modern', image: modernImg },
  { value: 'material', image: materialImg },
  { value: 'saas', image: saasImg },
  { value: 'flat', image: flatImg },
  { value: 'galaxy', image: galaxyImg },
  { value: 'retro', image: retroImg },
  { value: 'neon', image: neonImg },
  { value: 'pixel', image: pixelImg },
]

const Skin = () => {
  const { updateSettings, skin } = useLayoutContext()

  const handleSkinChange = (value: string) => {
    updateSettings({ skin: value })
  }

  return (
    <div id="skin" className="p-3 border-bottom border-dashed">
      <h5 className="mb-3 fw-bold">Select Theme</h5>
      <div className="row g-3">
        {skinOptions.map((item) => (
          <div className="col-6" id={`skin-${item.value}`} key={item.value}>
            <div className="form-check card-radio">
              <input className="form-check-input" type="radio" name="data-skin" id={`demo-skin-${item.value}`} checked={skin === item.value} onChange={() => handleSkinChange(item.value)} />
              <label className="form-check-label p-0 w-100" htmlFor={`demo-skin-${item.value}`}>
                <img src={item.image} alt="layout-img" className="img-fluid" />
              </label>
            </div>
            <h5 className="text-center text-muted mt-2 mb-0">{toTitleCase(item.value)}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skin
