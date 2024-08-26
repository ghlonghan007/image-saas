import os
import argparse

def print_tree(path, indent=""):
    """递归打印目录结构"""
    if os.path.isdir(path):
        # 打印当前目录的名称
        print(indent + os.path.basename(path) + "/")
        # 递归处理所有子目录和文件
        for item in sorted(os.listdir(path)):
            item_path = os.path.join(path, item)
            if os.path.isdir(item_path):
                print_tree(item_path, indent + "    ")
            else:
                print(indent + "    " + item)

def main():
    parser = argparse.ArgumentParser(description="Print directory tree")
    parser.add_argument("path", type=str, help="The directory path to print")
    args = parser.parse_args()

    if not os.path.exists(args.path):
        print(f"Path {args.path} does not exist.")
        return

    print_tree(args.path)

if __name__ == "__main__":
    main()
