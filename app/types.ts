export interface Capsule {
  capsule_id: string;
  capsule_serial: string;
  details: string;
  landings: number;
  missions: { name: string; flight: number }[];
  original_launch: string | null;
  reuse_count: number;
  status: string;
  type: string;
}

export interface FormValues {
  capsule_id: string;
  status: string;
  original_launch: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setLocalCapsules: React.Dispatch<React.SetStateAction<Capsule[]>>;
}

export interface ModalPortalProps {
  children: React.ReactNode;
}
