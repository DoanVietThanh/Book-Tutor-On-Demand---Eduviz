import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
interface EmojiInputProps extends InputProps<string> {}

export interface InputProps<T> {
  onChange: (value: T) => void;
}

const EmojiInput = ({ onChange }: EmojiInputProps) => {
  return (
    <div>
      <Picker
        data={data}
        onEmojiSelect={(emoji: any) => {
          console.log("Selected emoji:", emoji);
          onChange(emoji.native); // Use emoji.native to set the emoji's actual character
        }}
      />
    </div>
  );
};

export default EmojiInput;
