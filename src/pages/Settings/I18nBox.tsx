import { FC } from "react";
import { useTranslation } from "react-i18next";
import I18nDropdown from "../../components/I18nDropdown";

const I18nBox: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="box-border w-full transition-colors dark:text-white">
      <article className="relative rounded bg-white p-5 shadow-xl dark:bg-gray-800">
        <div className="flex justify-between">
          <h4 className="flex w-1/2 items-center font-bold xl:w-2/3">
            {t("settings.curr_lang")}
          </h4>
          <I18nDropdown />
        </div>
      </article>
    </div>
  );
};

export default I18nBox;
