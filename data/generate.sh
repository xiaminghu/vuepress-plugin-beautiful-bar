# 为 docs 中的路径创建 .json 文件
data_dir=`pwd`
template=${data_dir}/template.js
echo 'data_dir:' $data_dir
cd ../docs/
example_dir=`pwd`
echo 'example_dir:' $example_dir

for example in `ls`; do
    # echo $example
    fn=${data_dir}/${example}.js
    if [ ! -f $fn ]; then
        cp $template $fn
        echo 'create file:' $fn
    else
        echo 'file exists:' $fn
    fi
done;
