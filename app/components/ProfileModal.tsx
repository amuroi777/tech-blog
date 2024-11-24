import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import ProfileFileUpload from "./ProfileFileUpload";

export const CustomModal = ({ isOpen, onClose, onUpload }: { isOpen: boolean; onClose: () => void; onUpload: (url: string) => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>プロフィール画像を編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody alignItems="center" textAlign="center">
          <ProfileFileUpload onUpload={onUpload} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
