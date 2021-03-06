import { inject, observer } from 'mobx-react';
import React from 'react';
import { AccountStore } from '../../store/accountStore';
import { CustomPriceStore } from '../../store/customPriceStore';
import { UiStateStore } from '../../store/uiStateStore';
import CustomPriceDialog, { CustomPriceForm } from './CustomPriceDialog';

type CustomPriceDialogContainerProps = {
  uiStateStore?: UiStateStore;
  customPriceStore?: CustomPriceStore;
  accountStore?: AccountStore;
};

const CustomPriceDialogContainer = ({
  uiStateStore,
  customPriceStore,
}: CustomPriceDialogContainerProps) => {
  const value = uiStateStore!.selectedPricedItem?.calculated || 0;
  const initialValues: CustomPriceForm = {
    price: +value.toFixed(2),
  };

  const onSubmit = (form: CustomPriceForm) => {
    const price = uiStateStore!.selectedPricedItem;
    const activeLeagueId = uiStateStore!.selectedPriceTableLeagueId;
    if (price && activeLeagueId) {
      customPriceStore!.addOrUpdateCustomPrice(
        {
          calculated: price.calculated,
          customPrice: +form.price,
          name: price.name,
          icon: price.icon,
          quality: price.quality,
          links: price.links,
          level: price.level,
          corrupted: price.corrupted,
          frameType: price.frameType,
          variant: price.variant,
          elder: price.elder,
          shaper: price.shaper,
          ilvl: price.ilvl,
          tier: price.tier,
          count: 1,
        },
        activeLeagueId
      );
      uiStateStore!.setCustomPriceDialogOpen(false);
    }
  };

  return (
    <CustomPriceDialog
      show={uiStateStore!.customPriceDialogOpen}
      initialValues={initialValues}
      onClose={() => uiStateStore!.setCustomPriceDialogOpen(false)}
      onSubmit={(form: CustomPriceForm) => onSubmit(form)}
    />
  );
};

export default inject('uiStateStore', 'customPriceStore')(observer(CustomPriceDialogContainer));
