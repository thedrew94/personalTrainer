import { useEffect } from "react";

interface Props {
  setOpenContactsMap: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContactsMap({ setOpenContactsMap }: Props) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest(".contacts_map_modal_content")) setOpenContactsMap(false);
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenContactsMap(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setOpenContactsMap]);

  return (
    <div className="contacts_map_modal">
      <div className="contacts_map_modal_content">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.033365387851!2d12.622148876801903!3d41.827579668574565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132587d921b783b9%3A0xb53fdfeca780fc4!2sVia%20Tuscolana%2C%201445%2C%2000173%20Roma%20RM!5e0!3m2!1sit!2sit!4v1783687100671!5m2!1sit!2sit"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <button type="button" role="button" aria-label="Chiudi la mappa" onClick={() => setOpenContactsMap(false)}>
        CHIUDI
      </button>
    </div>
  );
}
