import { Node, mergeAttributes } from "@tiptap/core";

const Accordion = Node.create({
  name: "accordion",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      title: {
        default: "FAQ Title",
      },
    };
  },

  parseHTML() {
    return [{ tag: "details[data-type='accordion']" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "details",
      mergeAttributes(HTMLAttributes, {
        "data-type": "accordion",
        class: "faq-item border border-gray-600 rounded-md p-3 my-2",
      }),
      ["summary", { class: "faq-title font-semibold cursor-pointer" }, node.attrs.title],
      ["div", { class: "faq-content ml-3 mt-2 text-sm text-gray-300" }, 0],
    ];
  },
});

export default Accordion;
